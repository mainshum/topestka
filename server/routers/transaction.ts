import { string, object, number } from "valibot";
import { TRPCError } from "@trpc/server";
import { authenticatedProcedure, router } from "../trpc";
import { db } from "@/utils/db/pool";
import { transactions, users } from "@/utils/db/schema";
import { eq } from "drizzle-orm";
import { client } from "@/utils/p24";
import { TransactionStatus } from "@/utils/types";
import {
  Country,
  Currency,
  Encoding,
  Language,
  Order,
} from "@ingameltd/node-przelewy24";
import { nanoid } from "nanoid";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";
import { getP24Transaction } from "@/utils/p24";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Input validation schemas
const getTransactionStatusSchema = object({
  id: string(),
});

// Helper functions
function saveTransactionInDb(
  sessionId: string,
  email: string,
  token: string
): Promise<MySqlRawQueryResult> {
  return db
    .insert(transactions)
    .values({
      amount: parseInt(process.env.COURSE_PRICE),
      sessionId,
      email,
      token,
    })
    .execute();
}

function verifyTransaction(
  sessionId: string,
  amount: number,
  currency: string,
  orderId: number
): Promise<boolean> {
  return client.verifyTransaction({
    sessionId,
    amount,
    currency,
    orderId,
  });
}

const findTransaction = async (email: string, id: string) => {
  const transactionsList = await db
    .select()
    .from(transactions)
    .where(eq(transactions.email, email));

  const transaction = transactionsList.find((t) => t.sessionId === id);

  if (!transaction) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Transaction not found",
    });
  }

  return transaction;
};

// todo compare to price from input data from user
export const transactionRouter = router({
  startTransaction: authenticatedProcedure.mutation(async ({ ctx }) => {
    try {
      console.log(`startTransaction(env: ${process.env.P24_ENV})`);

      const coursePrice = parseInt(process.env.COURSE_PRICE);

      const sessionId = nanoid();
      const email = ctx.user.email;
      const allowedPurchasers = process.env.EMAILS_ALLOWED_TO_PURCHASE_REGEX;

      if (!email.match(allowedPurchasers)) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email not allowed to purchase",
        });
      }

      // ensure no access
      const usersList = await db.select().from(users).where(eq(users.email, email));
      if (usersList[0]?.hasAccess) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already has access",
        });
      }


      const order: Order = {
        sessionId,
        amount: coursePrice,
        currency: Currency.PLN,
        description: `Zakup kursu toPestka`,
        email,
        country: Country.Poland,
        language: Language.PL,
        urlReturn: `${baseUrl}/transaction/status/${sessionId}`,
        timeLimit: 15, // 15min
        encoding: Encoding.UTF8,
      };

      const { token, link } = await client.createTransaction(order);

      await saveTransactionInDb(sessionId, email, token);

      return { link };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to start transaction",
      });
    }
  }),

  getTransactionStatus: authenticatedProcedure
    .input(getTransactionStatusSchema)
    .query(async ({ ctx, input }): Promise<true> => {
      try {

        console.log(`getTransactionStatus(env: ${ctx.user.email}, ${input.id})`);

        const email = ctx.user.email;

        const [transDB, transP24] = await Promise.all([
          findTransaction(email, input.id),
          getP24Transaction(input.id),
        ]);

        console.log(`transDB: ${transDB.status}, transP24: ${transP24.status}`);

        const updateDbsAndSession = async () => {
          await Promise.all([
            db
              .update(transactions)
              .set({ status: "success" })
              .where(eq(transactions.sessionId, transDB.sessionId)),
            db
              .update(users)
              .set({ hasAccess: true })
              .where(eq(users.email, email)),
          ]);
          ctx.user.hasAccess = true;
        };


        if (transP24.status === 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Brak płatności",
          });
        }

        if (transP24.status === 2) {
          await updateDbsAndSession();
          
          return true;
        }

        if (transP24.status !== 1) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Nieznany status transakcji",
          });
        }

        const isVerified = await verifyTransaction(
          transDB.sessionId,
          transP24.amount,
          transP24.currency,
          transP24.orderId
        );

        if (isVerified) {
          await updateDbsAndSession();
          ctx.user.hasAccess = true;

          return true;
        }

        if (transDB.status !== "pending") {
          await db
            .update(transactions)
            .set({ status: "pending" })
            .where(eq(transactions.sessionId, transDB.sessionId));
        }
        throw new TRPCError({
          code: "PAYMENT_REQUIRED",
          message: "Płatność zarejestrowana, ale nie potwierdzona",
        });
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Nie udało się uzyskać statusu transakcji",
          cause: error,
        });
      }
    }),
});

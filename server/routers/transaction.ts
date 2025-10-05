import { string, object, number } from "valibot";
import { TRPCError } from "@trpc/server";
import { authenticatedProcedure, router } from "../trpc";
import { db } from "@/utils/db/pool";
import { transaction, user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { client } from "@/utils/p24";
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
import { logInfo, logError, logWarn } from "@/utils/logger";

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
    .insert(transaction)
    .values({
      amount: parseInt(process.env.COURSE_PRICE),
      sessionId,
      email,
      token,
      updatedAt: new Date().toISOString(),
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
    .from(transaction)
    .where(eq(transaction.email, email));

  const match = transactionsList.find((t) => t.sessionId === id);

  if (!match) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Transaction not found",
    });
  }

  return match;
};

// todo compare to price from input data from user
export const transactionRouter = router({
  startTransaction: authenticatedProcedure.mutation(async ({ ctx }) => {
    try {
      logInfo("Starting transaction", { 
        userId: ctx.user.id,
        userEmail: ctx.user.email,
        p24Env: process.env.P24_ENV 
      });

      const coursePrice = parseInt(process.env.COURSE_PRICE);

      const sessionId = nanoid();
      const email = ctx.user.email;
      const allowedPurchasers = process.env.EMAILS_ALLOWED_TO_PURCHASE_REGEX;

      if (!email.match(allowedPurchasers)) {
        logWarn("Email not allowed to purchase", { 
          userId: ctx.user.id,
          email,
          allowedPurchasers 
        });
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email not allowed to purchase",
        });
      }

      // ensure no access
      const usersList = await db.select().from(user).where(eq(user.email, email));
      if (usersList[0]?.hasAccess) {
        logWarn("User already has access", { 
          userId: ctx.user.id,
          email 
        });
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

      logInfo("Transaction started successfully", { 
        userId: ctx.user.id,
        sessionId,
        email,
        coursePrice 
      });

      return { link };
    } catch (error) {
      if (error instanceof TRPCError) {
        logError("Transaction start failed with TRPC error", error, { 
          userId: ctx.user.id,
          userEmail: ctx.user.email 
        });
        throw error;
      }

      logError("Transaction start failed with unexpected error", error as Error, { 
        userId: ctx.user.id,
        userEmail: ctx.user.email 
      });

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
        logInfo("Getting transaction status", { 
          userId: ctx.user.id,
          userEmail: ctx.user.email,
          transactionId: input.id 
        });

        const email = ctx.user.email;

        const [transDB, transP24] = await Promise.all([
          findTransaction(email, input.id),
          getP24Transaction(input.id),
        ]);

        logInfo("Transaction status retrieved", { 
          userId: ctx.user.id,
          transactionId: input.id,
          dbStatus: transDB.status,
          p24Status: transP24.status 
        });

        const updateDbsAndSession = async () => {
          logInfo("Updating transaction and user access", { 
            userId: ctx.user.id,
            transactionId: input.id,
            sessionId: transDB.sessionId 
          });
          
          await Promise.all([
            db
              .update(transaction)
              .set({ status: "success" })
              .where(eq(transaction.sessionId, transDB.sessionId)),
            db
              .update(user)
              .set({ hasAccess: 1 })
              .where(eq(user.email, email)),
          ]);
          ctx.user.hasAccess = true;
          
          logInfo("Transaction and user access updated successfully", { 
            userId: ctx.user.id,
            transactionId: input.id 
          });
        };


        if (transP24.status === 0) {
          logWarn("No payment found", { 
            userId: ctx.user.id,
            transactionId: input.id,
            p24Status: transP24.status 
          });
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Brak płatności",
          });
        }

        if (transP24.status === 2) {
          logInfo("Payment confirmed, updating access", { 
            userId: ctx.user.id,
            transactionId: input.id 
          });
          await updateDbsAndSession();
          
          return true;
        }

        if (transP24.status !== 1) {
          logWarn("Unknown transaction status", { 
            userId: ctx.user.id,
            transactionId: input.id,
            p24Status: transP24.status 
          });
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
          logInfo("Transaction verified, updating access", { 
            userId: ctx.user.id,
            transactionId: input.id 
          });
          await updateDbsAndSession();
          ctx.user.hasAccess = true;

          return true;
        }

        if (transDB.status !== "pending") {
          logInfo("Updating transaction status to pending", { 
            userId: ctx.user.id,
            transactionId: input.id,
            sessionId: transDB.sessionId 
          });
          await db
            .update(transaction)
            .set({ status: "pending" })
            .where(eq(transaction.sessionId, transDB.sessionId));
        }
        
        logWarn("Payment registered but not confirmed", { 
          userId: ctx.user.id,
          transactionId: input.id,
          p24Status: transP24.status 
        });
        
        throw new TRPCError({
          code: "PAYMENT_REQUIRED",
          message: "Płatność zarejestrowana, ale nie potwierdzona",
        });
      } catch (error) {
        if (error instanceof TRPCError) {
          logError("Transaction status check failed with TRPC error", error, { 
            userId: ctx.user.id,
            transactionId: input.id 
          });
          throw error;
        }

        logError("Transaction status check failed with unexpected error", error as Error, { 
          userId: ctx.user.id,
          transactionId: input.id 
        });

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Nie udało się uzyskać statusu transakcji",
          cause: error,
        });
      }
    }),
});

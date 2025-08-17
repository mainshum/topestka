import {string, object} from 'valibot';
import { TRPCError } from "@trpc/server";
import { authenticatedProcedure, router } from "../trpc";
import { db } from "@/utils/db/pool";
import { transactions, users } from "@/utils/db/schema";
import { eq } from "drizzle-orm";
import { client } from "@/utils/p24";
import { TransactionStatus } from "@/utils/types";
import { Country, Currency, Encoding, Language, Order } from "@ingameltd/node-przelewy24";
import { nanoid } from "nanoid";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const coursePrice = 5000;

// Input validation schemas
const getTransactionStatusSchema = object({
  id: string()
});

// P24 transaction status mapping
type P24TransactionStatus = {
  0: 'no-payment',
  1: 'advance payment',
  2: 'payment made',
  3: 'payment returned',
}

type P24TransactionById = {
  statement: string,
  orderId: number,
  sessionId: string,
  status: keyof P24TransactionStatus,
  amount: number,
  currency: string,
}

// Helper functions
function saveTransactionInDb(sessionId: string, email: string, token: string): Promise<MySqlRawQueryResult> {
  return db.insert(transactions).values({
    amount: coursePrice,
    sessionId,
    email,
    token,
  }).execute();
}

function verifyTransaction(sessionId: string, amount: number, currency: string, orderId: number): Promise<boolean> {
  return client.verifyTransaction({
    sessionId,
    amount,
    currency,
    orderId,
  });
}

const getP24Transaction = async (sessionId: string): Promise<P24TransactionById> => {
  const response = await fetch(
    `https://sandbox.przelewy24.pl/api/v1/transaction/by/sessionId/${sessionId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.P24_MERCHANT_ID}:${process.env.P24_API_KEY}`
        ).toString("base64")}`,
      },
    }
  );

  if (!response.ok) {
    throw new TRPCError({
      code: "BAD_GATEWAY",
      message: `P24 API error: ${response.statusText}`,
    });
  }

  const data = await response.json();
  if (!data.data) {
    throw new TRPCError({
      code: "BAD_GATEWAY",
      message: "Invalid P24 API response format",
    });
  }

  return data.data;
};

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

export const transactionRouter = router({
  startTransaction: authenticatedProcedure
    .mutation(async ({ ctx }) => {
      try {
        const sessionId = nanoid();
        const email = ctx.user.email;

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

        console.error(error);
        if (error instanceof TRPCError) {
          throw error;
        }
        
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to start transaction",
          cause: error,
        });
      }
    }),

  getTransactionStatus: authenticatedProcedure
    .input(getTransactionStatusSchema)
    .query(async ({ ctx, input }) => {
      try {
        const email = ctx.user.email;
        
        const [transDB, transP24] = await Promise.all([
          findTransaction(email, input.id),
          getP24Transaction(input.id)
        ]);

        let status: TransactionStatus;

        switch (transP24.status) {
          case 0:
            throw new TRPCError({
              code: "PAYMENT_REQUIRED",
              message: "Transaction still pending",
            });
          case 1:
            const isVerified = await verifyTransaction(
              transDB.sessionId, 
              transP24.amount, 
              transP24.currency, 
              transP24.orderId
            );
            status = isVerified ? 'success' : 'failed';
            await db.update(transactions).set({
              status: status,
            }).where(eq(transactions.sessionId, transDB.sessionId));
            break;
          case 2:
            status = 'already-verified';
            break;
          default:
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid transaction status",
            });
        }

        return { status };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get transaction status",
          cause: error,
        });
      }
    }),
});

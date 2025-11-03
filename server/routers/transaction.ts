import { string, object, number, nullable } from "valibot";
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
import { validateDiscountToken, releaseDiscountToken } from "@/utils/discount";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Input validation schemas
const getTransactionStatusSchema = object({
  id: string(),
});

const startTransactionSchema = object({
  discountToken: nullable(string()),
});

// Helper functions
function saveTransactionInDb(
  sessionId: string,
  email: string,
  token: string,
  amount: number,
  discountToken: string | null
): Promise<MySqlRawQueryResult> {
  return db
    .insert(transaction)
    .values({
      amount,
      sessionId,
      email,
      token,
      discountToken: discountToken,
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

export const transactionRouter = router({
  startTransaction: authenticatedProcedure
    .input(startTransactionSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        logInfo("Starting transaction", { 
          userEmail: ctx.user.email,
          p24Env: process.env.P24_ENV,
          hasDiscountToken: !!input.discountToken
        });

        let coursePrice = parseInt(process.env.COURSE_PRICE);
        const discountToken = input.discountToken;

        // Validate discount token if provided
        if (discountToken) {
          const validationResult = await validateDiscountToken(discountToken);
          
          if (!validationResult.success) {
            const errorMessage = validationResult.error === 'already-used' 
              ? 'Kupon już został użyty' 
              : 'Nieprawidłowy kupon';
            
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: errorMessage,
            });
          }
          
          // Use coupon price
          coursePrice = validationResult.price;
          
          logInfo("Discount token validated", { 
            userEmail: ctx.user.email,
            couponPrice: coursePrice
          });
        }

        const sessionId = nanoid();
        const email = ctx.user.email;
        const allowedPurchasers = process.env.EMAILS_ALLOWED_TO_PURCHASE_REGEX;

        if (!email.match(allowedPurchasers)) {
          logWarn("Email not allowed to purchase", { 
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

        await saveTransactionInDb(sessionId, email, token, coursePrice, discountToken);

        logInfo("Transaction started successfully", { 
          sessionId,
          email,
          coursePrice,
          usedDiscountToken: !!discountToken
        });

        return { link };
      } catch (error) {
        // If we have a discount token but transaction failed, we need to release it
        // But since we haven't saved the transaction yet, we can't release it here
        // The token will be available for reuse since it wasn't marked as used

        if (error instanceof TRPCError) {
          logError("Transaction start failed with TRPC error", error, { 
            userEmail: ctx.user.email 
          });
          throw error;
        }

        logError("Transaction start failed with unexpected error", error as Error, { 
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
          userEmail: ctx.user.email,
          transactionId: input.id 
        });

        const email = ctx.user.email;

        const [transDB, transP24] = await Promise.all([
          findTransaction(email, input.id),
          getP24Transaction(input.id),
        ]);

        logInfo("Transaction status retrieved", { 
          transactionId: input.id,
          dbStatus: transDB.status,
          p24Status: transP24.status 
        });

        const updateDbsAndSession = async () => {
          logInfo("Updating transaction and user access", { 
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
              .set({ hasAccess: true })
              .where(eq(user.email, email)),
          ]);
          ctx.user.hasAccess = true;
          
          logInfo("Transaction and user access updated successfully", { 
            transactionId: input.id 
          });
        };


        if (transP24.status === 0) {
          logWarn("No payment found", { 
            transactionId: input.id,
            p24Status: transP24.status 
          });
          
          // Release discount token if transaction failed
          if (transDB.discountToken) {
            try {
              await releaseDiscountToken(transDB.discountToken);
              logInfo("Released discount token due to no payment", { 
                transactionId: input.id,
                discountToken: transDB.discountToken
              });
            } catch (releaseError) {
              logError("Failed to release discount token", releaseError as Error, { 
                transactionId: input.id,
                discountToken: transDB.discountToken
              });
            }
          }
          
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Brak płatności",
          });
        }

        if (transP24.status === 2) {
          logInfo("Payment confirmed, updating access", { 
            transactionId: input.id 
          });
          await updateDbsAndSession();
          
          return true;
        }

        if (transP24.status !== 1) {
          logWarn("Unknown transaction status", { 
            transactionId: input.id,
            p24Status: transP24.status 
          });
          
          // Release discount token for unknown status
          if (transDB.discountToken) {
            try {
              await releaseDiscountToken(transDB.discountToken);
              logInfo("Released discount token due to unknown status", { 
                transactionId: input.id,
                discountToken: transDB.discountToken,
                p24Status: transP24.status
              });
            } catch (releaseError) {
              logError("Failed to release discount token", releaseError as Error, { 
                transactionId: input.id,
                discountToken: transDB.discountToken
              });
            }
          }
          
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
            transactionId: input.id 
          });
          await updateDbsAndSession();
          ctx.user.hasAccess = true;

          return true;
        }

        // Transaction not verified - release discount token
        if (transDB.discountToken) {
          try {
            await releaseDiscountToken(transDB.discountToken);
            logInfo("Released discount token due to verification failure", { 
              transactionId: input.id,
              discountToken: transDB.discountToken
            });
          } catch (releaseError) {
            logError("Failed to release discount token", releaseError as Error, { 
              transactionId: input.id,
              discountToken: transDB.discountToken
            });
          }
        }

        if (transDB.status !== "pending") {
          logInfo("Updating transaction status to pending", { 
            transactionId: input.id,
            sessionId: transDB.sessionId 
          });
          await db
            .update(transaction)
            .set({ status: "pending" })
            .where(eq(transaction.sessionId, transDB.sessionId));
        }
        
        logWarn("Payment registered but not confirmed", { 
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
            transactionId: input.id 
          });
          throw error;
        }

        logError("Transaction status check failed with unexpected error", error as Error, { 
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

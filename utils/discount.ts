import { number, object, parse, optional, string } from "valibot";
import { logError, logInfo } from "./logger";
import { db } from "./db/pool";
import { transaction } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const jwt = require('jsonwebtoken');

export const pricingSchema = object({
  cena: number(),
  validUntil: optional(string()), // ISO 8601 date string for multi-use coupons
})

// Simplified types
export type DiscountValidationResult =
  | { success: true; price: number }
  | { success: false; error: 'invalid-signature' | 'invalid-payload' | 'already-used' | 'expired' | 'db-error' }

// Database operations for discount tokens
export async function isDiscountTokenUsed(token: string): Promise<boolean> {
  try {
    const result = await db
      .select()
      .from(transaction)
      .where(eq(transaction.discountToken, token))
      .limit(1);
    return result.length > 0;
  } catch (error) {
    logError('Database error checking discount token', error as Error);
    throw error;
  }
}

export async function releaseDiscountToken(discountToken: string): Promise<void> {
  try {
    // Check if this is a multi-use coupon by verifying the token
    try {
      const payload = jwt.verify(discountToken, process.env.JWT_SECRET);
      const parsedPayload = parse(pricingSchema, payload);

      // Don't release multi-use coupons (they can be reused)
      if (parsedPayload.validUntil) {
        return;
      }
    } catch (verifyError) {
      // If token verification fails, still try to release it
      // (it might be invalid but we want to clean up the DB)
    }

    // Only release single-use coupons
    await db
      .update(transaction)
      .set({ discountToken: null })
      .where(eq(transaction.discountToken, discountToken));
  } catch (error) {
    logError('Database error releasing discount token', error as Error);
    throw error;
  }
}

// Main discount validation function
export async function validateDiscountToken(token: string): Promise<DiscountValidationResult> {
  try {
    // First verify JWT signature and parse payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const parsedPayload = parse(pricingSchema, payload);

    // Check if this is a multi-use coupon (has validUntil)
    if (parsedPayload.validUntil) {
      // Multi-use coupon: check expiration date
      const expirationDate = new Date(parsedPayload.validUntil);
      const now = new Date();

      if (now > expirationDate) {
        logError('Coupon validation failed: expired', new Error('Multi-use coupon expired'), {
          validUntil: parsedPayload.validUntil,
          expirationDate: expirationDate.toISOString(),
          now: now.toISOString(),
          price: parsedPayload.cena
        });
        return { success: false, error: 'expired' };
      }

      // Multi-use coupons don't need to check if already used
      logInfo('Coupon validation successful: multi-use coupon', {
        price: parsedPayload.cena,
        validUntil: parsedPayload.validUntil
      });
      return { success: true, price: parsedPayload.cena };
    }

    // Single-use coupon: check if already used
    const isUsed = await isDiscountTokenUsed(token);
    if (isUsed) {
      logError('Coupon validation failed: already used', new Error('Single-use coupon already used'), {
        price: parsedPayload.cena
      });
      return { success: false, error: 'already-used' };
    }

    logInfo('Coupon validation successful: single-use coupon', {
      price: parsedPayload.cena
    });
    return { success: true, price: parsedPayload.cena };
  } catch (error) {
    if (error instanceof Error && error.message.includes('jwt')) {
      logError('Coupon validation failed: invalid signature', error);
      return { success: false, error: 'invalid-signature' };
    }
    if (error instanceof Error && error.message.includes('Invalid')) {
      logError('Coupon validation failed: invalid payload', error);
      return { success: false, error: 'invalid-payload' };
    }
    logError('Unexpected error validating discount token', error as Error);
    return { success: false, error: 'db-error' };
  }
}
import { number, object, parse } from "valibot";
import { logError } from "./logger";
import { db } from "./db/pool";
import { transaction } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const jwt = require('jsonwebtoken');

export const pricingSchema = object({
  cena: number(),
})

// Simplified types
export type DiscountValidationResult = 
  | { success: true; price: number }
  | { success: false; error: 'invalid-signature' | 'invalid-payload' | 'already-used' | 'db-error' }

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
    
    // Check if token is already used
    const isUsed = await isDiscountTokenUsed(token);
    if (isUsed) {
      return { success: false, error: 'already-used' };
    }
    
    return { success: true, price: parsedPayload.cena };
  } catch (error) {
    if (error instanceof Error && error.message.includes('jwt')) {
      return { success: false, error: 'invalid-signature' };
    }
    if (error instanceof Error && error.message.includes('Invalid')) {
      return { success: false, error: 'invalid-payload' };
    }
    logError('Unexpected error validating discount token', error as Error);
    return { success: false, error: 'db-error' };
  }
}
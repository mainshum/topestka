import { clsx, type ClassValue } from "clsx"
import { Result } from "neverthrow";
import { twMerge } from "tailwind-merge"
import { number, object, parse } from "valibot";
import { CouponPricing, PricingError } from "./types";
import { logError } from "./logger";

const jwt = require('jsonwebtoken');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pricingSchema = object({
  cena: number(),
})

export function tapError<E>(message: (error: E) => void) {
  return (error: E): E => {
    message(error);
    return error;
  }
}


export const decodedDiscount = (token: string): Result<CouponPricing, PricingError> => Result.fromThrowable(
  (token: string) => jwt.verify(token as string, process.env.JWT_SECRET),
  (error: unknown) => ({error: error as Error, discountError: 'invalid-signature' as const})
)(token)
.andThen(Result.fromThrowable(payload => parse(pricingSchema, payload), (error) => ({error: error as Error, discountError: 'invalid-payload' as const})))
.map(payload => ({ couponPrice: payload.cena, type: 'coupon' as const }));

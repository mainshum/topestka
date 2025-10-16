export type TransactionStatus = 'success' | 'failed' | 'already-verified' | 'no-payment';

type NoCouponPricing =  {
    fullPrice: number;
    discountPrice: number;
    type: 'no-coupon';
}

export type CouponPricing = {
    couponPrice: number;
    type: 'coupon';
}

export type PricingError = {
    error: Error,
    discountError: 'invalid-payload' | 'used' | 'invalid-signature';
}

export type Pricing = NoCouponPricing | CouponPricing;

export type UIPricing = CuponPricing | NoCouponPricingUI;

type CuponPricing = {
  topPrice: number;
  topPriceLabel: string;
  isError: boolean;
  type: 'coupon';
}

type NoCouponPricingUI = {
  topPrice: number;
  bottomPrice: number;
  type: 'no-coupon';
}

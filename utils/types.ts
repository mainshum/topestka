export type TransactionStatus = 'success' | 'failed' | 'already-verified' | 'no-payment';

export type UIPricing =
  | {
      type: 'no-coupon';
      price: number;
    }
  | {
      type: 'coupon';
      topPrice: number;
      topPriceLabel: string;
      isError: boolean;
      discountToken?: string; // Present when isError is false
    };

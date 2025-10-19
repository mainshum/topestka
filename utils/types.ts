export type TransactionStatus = 'success' | 'failed' | 'already-verified' | 'no-payment';

export type UIPricing = 
  | {
      type: 'no-coupon';
      fullPrice: number;
      discountPrice: number;
    }
  | {
      type: 'coupon';
      topPrice: number;
      topPriceLabel: string;
      isError: boolean;
    };

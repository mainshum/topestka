import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
// Components
import KupKursSection from "@/components/KupKursSection";
import { UIPricing } from "@/utils/types";
import { validateDiscountToken } from "@/utils/discount";
import { getKursEnabled } from "@/utils/getKursEnabled";

type Props = {
  kursEnabled: boolean;
  pricing: UIPricing;
}

const KupPage: NextPage<Props> = ({ pricing }) => {
  return <KupKursSection pricing={pricing} />;
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<{ props: Props }> => {
  const { COURSE_PRICE } = process.env;
  const kursEnabled = getKursEnabled();
  
  if (COURSE_PRICE == null) {
    throw new Error('COURSE_PRICE is not set');
  }
  let coursePrice = parseInt(COURSE_PRICE);
  if (isNaN(coursePrice)) {
    throw new Error('COURSE_PRICE is not a number');
  }
  const discount = context.query?.discount;

  if (discount == null) {
    return {
      props: {
        kursEnabled,
        pricing: { 
          price: coursePrice, 
          type: 'no-coupon' as const 
        }
      }
    };
  }
  // Validate discount token
  const validationResult = await validateDiscountToken(discount as string);
  
  if (validationResult.success) {
    return {
      props: {
        kursEnabled,
        pricing: {
          topPrice: validationResult.price,
          topPriceLabel: 'Zastosowano kupon!!',
          isError: false,
          type: 'coupon' as const,
        }
      }
    };
  }

  // Handle validation errors
  const errorMessage = validationResult.error === 'already-used' 
    ? 'Kupon już został użyty' 
    : 'Podano nieprawidłowy kupon';

  return {
    props: {
      kursEnabled,
      pricing: {
        topPrice: coursePrice,
        topPriceLabel: errorMessage,
        isError: true,
        type: 'coupon' as const,
      }
    }
  };
};

export default KupPage;


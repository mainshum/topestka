import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
// Components
import KupKursSection from "@/components/KupKursSection";
import { UIPricing } from "@/utils/types";
import { validateDiscountToken } from "@/utils/discount";
import { getKursEnabled } from "@/utils/getKursEnabled";
import { getDiscountCookieFromHeader } from "@/utils/discountCookie";
import { COURSE_BASE_PRICE_GR } from "@/utils/const";

type Props = {
  kursEnabled: boolean;
  pricing: UIPricing;
}

const KupPage: NextPage<Props> = ({ pricing }) => {
  return <KupKursSection pricing={pricing} />;
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<{ props: Props }> => {
  const kursEnabled = getKursEnabled();
  const coursePrice = COURSE_BASE_PRICE_GR;
  // Check for discount in query parameter first, then fall back to cookie
  const discountFromQuery = context.query?.discount;
  const discountFromCookie = getDiscountCookieFromHeader(context.req.headers.cookie);
  const discount = discountFromQuery || discountFromCookie;

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
          discountToken: discount as string, // Pass token to client for cookie storage
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


import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import "../public/trailer.mp4";
import { message, number, object, optional, parse, safeParse, string } from "valibot";
// Components
import { Intro } from "@/components/Intro";
import Pitch from "@/components/Pitch";
import OpisKursu from "@/components/OpisKursu";
import DowiedzSie from "@/components/DowiedzSie";
import ProgramFull from "@/components/ProgramFull";
import DlaKogo, {
  AccordionItemData as DlaKogoItemData,
} from "@/components/DlaKogo";
import KursWLiczbach, { KursWLiczbachItem } from "@/components/KursWLiczbach";
import AboutUs from "@/components/AboutUs";
import KupKursSection from "@/components/KupKursSection";
import FAQ from "@/components/FAQ";
import Sponsors from "@/components/Sponsors";
import Newsletter from "@/components/Newsletter";
import Nav from "@/components/Nav";
import { ok, Ok, Result } from 'neverthrow';

const jwt = require('jsonwebtoken');

// Accordion Components
import { Promo } from "@/components/Promo";
import { CouponPricing, Pricing, PricingError, UIPricing } from "@/utils/types";
import { decodedDiscount, tapError } from "@/utils/misc";
import { logError } from "@/utils/logger";

type Props = {
  kursEnabled: boolean;
  pricing: UIPricing;
}

const Home: NextPage<Props> = (props) => {
  const { kursEnabled, pricing } = props;
  return (
    <>
      <Nav kursEnabled={kursEnabled} />
      <Intro />
      <Promo />
      <Pitch />
      <OpisKursu />
      <DowiedzSie />
      <ProgramFull />
      <DlaKogo items={dlaKogoItems} />
      <KursWLiczbach items={kursWLiczbachItems} />
      <AboutUs />
      <KupKursSection kursEnabled={kursEnabled} pricing={pricing} />
      <FAQ />
      <Sponsors />
      <Newsletter />
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { KURS_ENABLED, COURSE_PRICE, COURSE_DISCOUNT_PRICE } = process.env;
  if (KURS_ENABLED == null || COURSE_PRICE == null || COURSE_DISCOUNT_PRICE == null) {
    throw new Error('KURS_ENABLED, COURSE_PRICE or COURSE_DISCOUNT_PRICE is not set');
  }
  let coursePrice = parseInt(COURSE_PRICE);
  let courseDiscountPrice = parseInt(COURSE_DISCOUNT_PRICE);
  if (isNaN(coursePrice) || isNaN(courseDiscountPrice)) {
    throw new Error('COURSE_PRICE or COURSE_DISCOUNT_PRICE is not a number');
  }
  const discount = context.query?.discount;

  const pricing: Result<Pricing, PricingError> = discount == null
    ? ok({ fullPrice: coursePrice, discountPrice: courseDiscountPrice, type: 'no-coupon' as const, })
    : decodedDiscount(discount as string)
      .mapErr(tapError(x => {
        switch (x.discountError) {
          case 'invalid-signature':
            logError('Invalid discount token', x.error);
          case 'invalid-payload':
            logError('Invalid discount token', x.error);
          case 'used':
            logError('Invalid discount token', x.error);
        }
      }))

  return {
    props: {
      kursEnabled: Boolean(KURS_ENABLED),
      pricing: pricing
        .match((x: Pricing): UIPricing => {
          return x.type === 'no-coupon' ? {
            topPrice: x.fullPrice,
            bottomPrice: x.discountPrice,
            type: 'no-coupon' as const,
          } : {
            topPrice: x.couponPrice,
            topPriceLabel: 'Zastosowano kupon!!',
            isError: false,
            type: 'coupon' as const,
          }
        }, ({ discountError, error }) => {
          return {
            topPrice: coursePrice,
            bottomPrice: courseDiscountPrice,
            topPriceLabel: discountError === 'used' ? 'Kupon już został użyty' : 'Podano nieprawidłowy kupon',
            isError: true,
            type: 'coupon' as const,
          }
        })

      ,
    },
  };
};

export default Home;

// Data for components
const dlaKogoItems: DlaKogoItemData[] = [
  [
    "Lekarek i lekarzy",
    "Jeśli jesteś specjalistką lub specjalistą, która/y pragnie lepiej zrozumieć perspektywę pacjentek oraz skuteczniej rozpoznawać i przekazywać informacje na temat zespołu MRKH, ten materiał jest dla Ciebie.",
  ],
  [
    "Studentek i studentów",
    "Jeśli studiujesz kierunek lekarski i chcesz rozwijać umiejętności w zakresie komunikacji z pacjentkami, ten kurs pomoże Ci zrozumieć, jak rozmawiać o niekiedy trudnych kwestiach związanych z zespołem MRKH.",
  ],
  [
    "Specjalistek i specjalistów",
    "Pracujesz na co dzień z pacjentkami jako psycholożka/psycholog, terapeutka/terapeuta, urofizjoterapeutka/urofizjoterapeuta? Dowiedz się, jak budować zaufanie i wspierać pacjentki w rozmowach o zespole MRKH.",
  ],
  [
    "Bliskich",
    "Jeśli bliska Ci osoba ma zespół MRKH i chcesz zrozumieć jej sytuację oraz dowiedzieć się więcej o tym zespole, znajdziesz tu wartościowe informacje.",
  ],
];

const kursWLiczbachItems: KursWLiczbachItem[] = [
  [
    "70",
    <span key="70">
      tyle minut trwa wideo
      <br /> zawarte w naszym kursie
    </span>,
  ],
  ["13", "tyle rodziałów ma nasz kurs "],
  ["13", "tyle warsztatów i wykładów przeprowadziłyśmy na uczelniach medycznych w Polsce"],
  [
    "10K",
    "to liczba wydrukowanych przez nas broszur, które dystrybuujemy w całej Polsce",
  ],
];

;

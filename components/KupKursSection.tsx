import React from "react";
import HomeSection from "./HomeSection";
import { OfferingSection, OfferingList } from "./Offering";
import { buttonVariants } from "./Button";
import Link from "next/link";
import { NEWSLETTER_URL } from "@/utils/const";
import { cn } from "@/utils/misc";
import { PowiadomLubKup } from "./PowiadomLubKup";
import { UIPricing } from "@/utils/types";
import { useEnv } from "./EnvContext";

type CenaProps = {
  children: React.ReactNode;
  koszt: number;
  priceLabel: string;
  flipFlex?: boolean;
};

const Cena = ({ children, koszt, priceLabel, flipFlex }: CenaProps) => {
  return (
    <div className={cn("flex flex-col w-full pl-2 pb-3 border-b-[1.5px] border-b-butter-100", flipFlex ? 'flex-col-reverse' : 'flex-col')}>
      {children}
      <div>
        <span aria-label={priceLabel} className="pr-2 font-outfit text-3xl md:text-5xl">{koszt}</span>
        <span className="font-outfit text-xl">(PLN brutto)</span>
      </div>
    </div>
  );
};

const grToPln = (gr: number) => {
  return gr / 100;
}

const KupKursSection = ({ pricing }: { pricing: UIPricing }) => {
  const { kursEnabled } = useEnv();
  const topSpanClass = cn('pl-2 font-monarcha', pricing.type === 'coupon' && (pricing.isError ? 'text-red-400' : 'text-green-400'));

  return (
    <HomeSection
      id="kup-kurs"
      className="grid xl:grid-cols-[1fr_1.22fr] py-16 xl:py-24 gap-10 px-6 md:px-20"
    >
      <OfferingSection aria-label="Cena kursu">
        <h1 className="font-monarcha whitespace-nowrap text-3xl text-center md:text-5xl">
          MRKH to pestka!
        </h1>
        {pricing.type === 'coupon' ? (
          <Cena koszt={grToPln(pricing.topPrice)} priceLabel={pricing.topPriceLabel} flipFlex={pricing.type === 'coupon'}>
            <span className={topSpanClass}>{pricing.topPriceLabel}</span>
          </Cena>
        ): (
          <Cena koszt={grToPln(pricing.price)} priceLabel="Cena">
            <span className={topSpanClass}>Cena</span>
          </Cena>
        )}
        
        <div className="h-0" />
        <PowiadomLubKup className={cn(buttonVariants({ variant: 'powiadom', size: 'lg' }), 'xl:hidden')} />
        <PowiadomLubKup className={cn(buttonVariants({ variant: 'powiadom', size: 'xl' }), 'hidden xl:inline relative bottom-4 xl:bottom-0')} />
      </OfferingSection>
      <section className="flex flex-col xl:flex-row px-10 gap-4 justify-center items-center order-3 xl:row-start-2 space-between">
        <span className="text-xl">
          Dołącz do newslettera, aby nie przegapić naszych działań
        </span>
        <div className="h-5 xl:h-0" />
        <Link href={NEWSLETTER_URL} className={`${buttonVariants({ variant: 'kupkurs', size: 'lg' })} whitespace-nowrap`}  >
          Zapisz się
        </Link>
      </section>
      <OfferingSection className="gap-3 md:px-10 row-span-2">
        <h1 className="pb-2 border-b-[1.5px] w-full border-b-ewhite font-outfit text-3xl md:text-5xl">
          Kurs zawiera
        </h1>
        <OfferingList
          items={[
            "ponad godzinny materiał video",
            "badania dotyczące komunikacji",
            "materiały edukacyjne na temat zespołu MRKH ",
            "quiz, dzięki któremu sprawdzisz, czy MRKH to pestka!",
            "certyfikat ukończenia kursu od Fundacji Bezpestkowe",
          ]}
        />
        <div className="h-4" />
        <Link
          className={`${buttonVariants({ variant: "program2", size: "lg" })} xl:hidden`}
          href="/program"
        >
          Poznaj program
        </Link>
        <Link
          className={`${buttonVariants({ variant: "program2", size: "xl" })} hidden xl:inline`}
          href="/program"
        >
          Poznaj program
        </Link>
      </OfferingSection>
    </HomeSection>
  );
};

export default KupKursSection;

import React from "react";
import HomeSection from "./HomeSection";
import { OfferingSection, OfferingList } from "./Offering";
import { KupKurs } from "./Intro";
import { Button } from "./Button";

type CenaProps = {
  children: React.ReactNode;
  koszt: string;
};

const Cena = ({ children, koszt }: CenaProps) => {
  return (
    <div className="flex flex-col w-full pl-2 pb-3 border-b-[1.5px] border-b-butter-100">
      {children}
      <div>
        <span className="pr-2 font-outfit text-3xl md:text-5xl">{koszt}</span>
        <span className="font-outfit text-xl">(PLN brutto)</span>
      </div>
    </div>
  );
};

const KupKursSection = () => {
  return (
    <HomeSection
      id="kup-kurs"
      className="grid grid-cols-[1fr_1.22fr] py-24 gap-x-10 px-6 md:px-20"
    >
      <section>
        <OfferingSection>
          <h1 className="font-monarcha whitespace-nowrap text-3xl text-center md:text-5xl">
            MRKH to pestka!
          </h1>
          <Cena koszt="299">
            <span className="pl-2 font-monarcha">cena</span>
          </Cena>
          <Cena koszt="200">
            <span className="bg-electric-600 px-2 py-1 rounded-md w-fit font-monarcha">
              cena do końca kwietnia
            </span>
          </Cena>
          <div className="h-0" />
          <Button variant="powiadom" size="xl" className="whitespace-nowrap">
            Powiadom o sprzedaży
          </Button>
        </OfferingSection>
      </section>
      <OfferingSection className="gap-3 md:px-10">
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
        <a
          href="#program"
          className="border-2 border-orange-400 mt-4 py-4 text-xl md:text-4xl btn btn-primary self-center"
        >
          Poznaj program
        </a>
      </OfferingSection>
    </HomeSection>
  );
};

export default KupKursSection;

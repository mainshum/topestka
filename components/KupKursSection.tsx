import React from "react";
import HomeSection from "./HomeSection";
import { OfferingSection, OfferingList } from "./Offering";
import { KupKurs } from "./Intro";

type CenaProps = {
  cena: React.ReactNode;
  koszt: string;
};

const Cena = ({ cena, koszt }: CenaProps) => {
  return (
    <div className="flex flex-col flex-grow-2 gap-4 pb-4 pl-2 border-b-[1.5px] border-b-butter-100">
      {cena}
      <div>
        <span className="pr-2 font-outfit text-3xl md:text-4xl">{koszt}</span>
        <span className="font-outfit text-xl">(PLN brutto)</span>
      </div>
    </div>
  );
};

const KupKursSection = () => {
  return (
    <HomeSection
      id="kup-kurs"
      className="flex flex-col justify-center gap-12 md:grid grid-cols-[45%_55%] px-6 md:px-20"
    >
      <section className="md:grid-rows-subgrid">
        <OfferingSection>
          <h1 className="font-monarcha text-3xl text-center md:text-5xl">
            MRKH to pestka!
          </h1>
          <Cena
            cena={<span className="pl-2 font-monarcha">cena</span>}
            koszt="299"
          />
          <Cena
            cena={
              <span className="bg-electric-600 px-2 py-1 rounded-md w-fit font-monarcha">
                cena do końca lutego
              </span>
            }
            koszt="200"
          />
          <KupKurs className="py-4 text-xl btn btn-secondary self-center" />
        </OfferingSection>
      </section>
      <OfferingSection className="gap-3 md:px-10">
        <h1 className="pb-4 border-b-[1.5px] border-b-ewhite font-outfit text-3xl md:text-5xl">
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
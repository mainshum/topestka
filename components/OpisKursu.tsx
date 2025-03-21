import React from "react";
import HomeSection from "./HomeSection";
import { SmLinebreak } from "./LineBreaks";

interface KursParagraphProps {
  children: React.ReactNode;
}

const KursParagraph: React.FC<KursParagraphProps> = ({ children }) => {
  return (
    <p className="pl-3 relative max-sm:right-2 border-l-[2px] border-l-eblue-600 font-normal font-outfit text-electric-600 text-xl md:text-2xl">
      {children}
    </p>
  );
};

const OpisKursu = () => {
  return (
    <HomeSection className="flex flex-col items-center pl-10 md:pl-40 pt-20 md:pt-36 md:pr-24 md:gap-24 gap-20">
      <h1 className="font-monarcha text-4xl md:text-6xl">
        Nasz kurs dostarczy Ci kompleksowej wiedzy o <SmLinebreak /> zespole
        MRKH w pracy lekarza
      </h1>
      <section className="flex flex-col items-start gap-9 md:pr-40">
        <KursParagraph>
          Program kursu pogłębia wiedzę o aspekty medyczne i psychologiczne
          związane z zespołem MRKH.
        </KursParagraph>
        <KursParagraph>
          Dzięki temu lekarze i studenci mogą przekazywać pacjentkom pełne i
          rzetelne informacje, budując w ten sposób ich poczucie bezpieczeństwa
          i zapewniając lepszą opiekę medyczną.
        </KursParagraph>
      </section>
    </HomeSection>
  );
};

export default OpisKursu;

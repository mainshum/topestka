import React from "react";
import HomeSection from "./HomeSection";
import { SmLinebreak } from "./LineBreaks";

const OpisKursu = () => {
  return (
    <HomeSection className="flex flex-col items-center pl-10 md:pl-40 md:pr-0 md:gap-20">
      <h1 className="font-monarcha text-4xl md:text-6xl">
        Nasz kurs dostarczy Ci kompleksowej wiedzy o <SmLinebreak /> zespole
        MRKH w pracy lekarza
      </h1>
      <section className="flex flex-col items-start gap-9 md:pr-40">
        <p className="pl-3 border-l-[2px] border-l-eblue-600 font-normal font-outfit text-electric-600 text-xl md:text-2xl">
          Program kursu pogłębia wiedzę o aspekty medyczne i psychologiczne
          związane z zespołem MRKH.
        </p>
        <p className="pl-3 border-l-[2px] border-l-eblue-600 font-normal font-outfit text-electric-600 text-xl md:text-2xl ">
          Dzięki temu lekarze i studenci mogą przekazywać pacjentkom pełne i
          rzetelne informacje, budując w ten sposób ich poczucie bezpieczeństwa
          i zapewniając lepszą opiekę medyczną.
        </p>
      </section>
    </HomeSection>
  );
};

export default OpisKursu;

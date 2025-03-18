import React from "react";
import HomeSection from "./HomeSection";
import { SmLinebreak } from "./LineBreaks";

const OpisKursu = () => {
  return (
    <HomeSection className="flex flex-col justify-evenly items-center px-10 md:px-24">
      <h1 className="pb-20 font-monarcha text-4xl md:text-6xl">
        Nasz kurs dostarczy Ci kompleksowej wiedzy o <SmLinebreak /> zespole
        MRKH w pracy lekarza
      </h1>
      <section className="flex flex-col items-start gap-9">
        <p className="pl-3 border-l-[1.5px] border-l-eblue font-normal font-outfit text-electric-600 text-xl md:text-2xl">
          Program kursu pogłębia wiedzę o aspekty medyczne i psychologiczne
          związane z zespołem MRKH.
        </p>
        <p className="pl-3 border-l-[1.5px] border-l-eblue font-normal font-outfit text-electric-600 text-xl md:text-2xl">
          Dzięki temu lekarze i studenci mogą przekazywać pacjentkom pełne i
          rzetelne informacje, budując w ten sposób ich poczucie bezpieczeństwa
          i zapewniając lepszą opiekę medyczną.
        </p>
      </section>
    </HomeSection>
  );
};

export default OpisKursu;
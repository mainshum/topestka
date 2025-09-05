import React from "react";
import HomeSection from "./HomeSection";
import { LgLinebreak, SmLinebreak } from "./LineBreaks";
import { cn } from "@/utils/misc";

const DowiedzSie = () => {
  return (
    <HomeSection decreaseSize className="flex flex-col justify-start bg-eblue px-8 md:px-40 md:pt-24 pt-20 md:gap-6 text-butter-100">
      <h1 className="font-outfit text-4xl md:text-6xl md:pb-20">
        Dowiedz się jak kluczowe znaczenie ma:
      </h1>
      <section className={cn("dowiedz-sie", "md:pb-9 pb-6 max-sm:pt-16")}>
        <h2>
          Empatyczne <SmLinebreak />
          przekazywanie diagnozy
        </h2>
        <p>
          Dowiedz się, jak rzetelnie i z szacunkiem przekazać diagnozę zespołu
          MRKH. Kurs dostarcza wskazówek, jak prowadzić rozmowy w sposób
          wspierający, uwzględniając emocje pacjentki i budując z nią poczucie
          zaufania.
        </p>
      </section>
      <section className={cn("dowiedz-sie")}>
        <h2>Wsparcie psychiczne i zrozumienie pacjentek</h2>
        <p>
          Kurs pozwala głębiej zrozumieć psychologiczne wyzwania i potrzeby
          pacjentek z zespołem MRKH. <LgLinebreak /> Dzięki wiedzy od osób z własnym
          doświadczeniem, nauczysz się, jak okazać prawdziwe wsparcie, które
          ułatwia pacjentkom proces akceptacji diagnozy.
        </p>
      </section>
    </HomeSection>
  );
};

export default DowiedzSie;

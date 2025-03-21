import React from "react";
import HomeSection from "./HomeSection";
import { SmLinebreak } from "./LineBreaks";
import { cn } from "@/utils/misc";

const DowiedzSie = () => {
  return (
    <HomeSection className="flex flex-col bg-eblue md:pl-40 md:pr-40 text-butter-100">
      <h1 className="font-outfit text-4xl md:text-6xl md:pb-20">
        Dowiedz się jak kluczowe znaczenie ma:
      </h1>
      <section className={cn("dowiedz-sie", "pb-9")}>
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
          pacjentek z zespołem MRKH. Dzięki wiedzy od osób z własnym
          doświadczeniem, nauczysz się, jak okazać prawdziwe wsparcie, które
          ułatwia pacjentkom proces akceptacji diagnozy."
        </p>
      </section>
    </HomeSection>
  );
};

export default DowiedzSie;

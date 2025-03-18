import React from "react";
import HomeSection from "./HomeSection";
import { SmLinebreak } from "./LineBreaks";

type DowiedzSieSectionProps = {
  title: React.ReactNode;
  content: React.ReactNode;
};

const DowiedzSieSection = ({ title, content }: DowiedzSieSectionProps) => (
  <section className="dowiedz-sie">
    <h2>{title}</h2>
    <p>{content}</p>
  </section>
);

const DowiedzSie = () => {
  return (
    <HomeSection className="flex flex-col justify-center bg-eblue px-10 md:pr-96 text-butter-100">
      <h1 className="pb-12 font-outfit text-4xl md:text-6xl">
        Dowiedz się jak kluczowe znaczenie ma:
      </h1>
      <DowiedzSieSection
        title={
          <>
            Empatyczne <SmLinebreak />
            przekazywanie diagnozy
          </>
        }
        content="Dowiedz się, jak rzetelnie i z szacunkiem przekazać diagnozę zespołu MRKH. Kurs dostarcza wskazówek, jak prowadzić rozmowy w sposób wspierający, uwzględniając emocje pacjentki i budując z nią poczucie zaufania."
      />
      <DowiedzSieSection
        title="Wsparcie psychiczne i zrozumienie pacjentek"
        content="Kurs pozwala głębiej zrozumieć psychologiczne wyzwania i potrzeby pacjentek z zespołem MRKH. Dzięki wiedzy od osób z własnym doświadczeniem, nauczysz się, jak okazać prawdziwe wsparcie, które ułatwia pacjentkom proces akceptacji diagnozy."
      />
    </HomeSection>
  );
};

export default DowiedzSie;
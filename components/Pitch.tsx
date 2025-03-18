import React from "react";
import HomeSection from "./HomeSection";
import { LgLinebreak, SmLinebreak } from "./LineBreaks";

const Pitch = () => {
  return (
    <HomeSection
      id="program"
      className="flex flex-col items-start bg-eblue gap-12 md:px-40 font-monarcha text-ewhite"
    >
      <h3 className="text-base text-electric-600 md:text-xl">
        Zdobywaj kompleksową wiedzę od pacjentek i ekspertek o zespole MRKH,{" "}
        <LgLinebreak /> by zapewniać najwyższy standard opieki.
      </h3>
      <h2 className="text-2xl md:text-5xl">
        Kurs pomoże Ci lepiej przekazywać diagnozę w sposób rzetelny,{" "}
        <SmLinebreak />
        wspierający i budujący poczucie bezpieczeństwa.
      </h2>
      <a href="#program-full" className="text-xl btn btn-secondary">
        Poznaj pełen program{" "}
      </a>
    </HomeSection>
  );
};

export default Pitch;
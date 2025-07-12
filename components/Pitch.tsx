import React from "react";
import HomeSection from "./HomeSection";
import { LgLinebreak, SmLinebreak } from "./LineBreaks";
import { buttonVariants } from "./Button";
import Link from "next/link";

const Pitch = () => {
  return (
    <HomeSection
      id="program"
      className="flex flex-col items-start bg-eblue pt-32 md:pt-40 gap-12 md:px-40 font-monarcha text-ewhite"
    >
      <h3 className="text-base text-electric-500 md:text-xl">
        Zdobywaj kompleksową wiedzę od pacjentek i ekspertek o zespole MRKH,{" "}
        <LgLinebreak /> by zapewniać najwyższy standard opieki.
      </h3>
      <h2 className="text-3xl md:text-5xl">
        Kurs pomoże Ci lepiej przekazywać diagnozę w sposób rzetelny,{" "}
        <SmLinebreak />
        wspierający i budujący poczucie bezpieczeństwa.
      </h2>
      <Link
        href="#program-full"
        className={buttonVariants({
          variant: "program",
          size: "lg",
        })}
      >
        Poznaj pełen program
      </Link>
    </HomeSection>
  );
};

export default Pitch;

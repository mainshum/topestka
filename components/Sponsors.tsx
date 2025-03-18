import React from "react";
import Image from "next/image";
import HomeSection from "./HomeSection";

type SponsorsProps = {
  sponsors: { src: any; alt: string }[];
};

const Sponsors = ({ sponsors }: SponsorsProps) => {
  return (
    <HomeSection className="flex flex-col justify-center items-center gap-8 px-8 text-eblue">
      <h1 className="text-center text-xl/snug">
        Organizacje partnerskie oraz wspierające nasze działania
      </h1>
      <section className="flex flex-wrap justify-center gap-8">
        {sponsors.map((sponsor, index) => (
          <Image key={index} src={sponsor.src} alt={sponsor.alt} />
        ))}
      </section>
    </HomeSection>
  );
};

export default Sponsors;
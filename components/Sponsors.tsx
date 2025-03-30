import React from "react";
import Image from "next/image";
import HomeSection from "./HomeSection";
import MagoVox from "../public/images/mago-big.png";

const sponsorsData = [
  {
    src: "/images/off.png",
    alt: "Fundacja Off",
  },
  {
    src:  "/images/kulawa.png",
    alt: "Fundacja kulawa Warszawa",
  },
  {
    src:  "/images/tranzycja.png",
    alt: "logo Tranzycja.pl",
  },
  {
    src:  "/images/rozowa.png",
    alt: "Logo Róźowa Skrzyneczka",
  },
  {
    src:  "/images/chemia.png",
    alt: "Logo Kolektyw Chemia",
  }
]

const Sponsors = () => {
  return (
    <HomeSection className="flex flex-col justify-start items-center py-28 md:py-20 pb-0 font-outfit text-eblue">
      <h1 className="text-3xl md:text-4xl">Matronat platformy</h1>
      <div className="h-7" />
      <Image src={MagoVox} alt="Mago Vox" />
      <div className="h-10 md:h-24" />
      <h2 className="text-xl md:text-4xl text-center">
        Organizacje partnerskie oraz wspierające <br /> nasze działania
      </h2>
      <div className="h-18" />
      <section className="flex flex-wrap justify-center gap-8 pt-10">
        {sponsorsData.map((sponsor, index) => (
          <div
            key={index}
            className="relative w-24 md:w-40 h-24 md:h-40"
          >
            <Image
              fill
              src={sponsor.src}
              sizes="(max-width: 768px) 96px, 160px"
              alt={sponsor.alt}
            />
          </div>
        ))}
      </section>
    </HomeSection>
  );
};

export default Sponsors;

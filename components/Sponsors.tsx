import React from "react";
import Image from "next/image";
import HomeSection from "./HomeSection";
import MagoVox from "../public/images/mago-big.png";
import Off from "../public/images/off.png";
import Kulawa from "../public/images/kulawa.png";
import Tranzycja from "../public/images/tranzycja.png";
import Rozowa from "../public/images/rozowa.png";
import Chemia from "../public/images/chemia.png";


const sponsorsData = [
  {
    src: Off,
    alt: "Fundacja Off",
  },
  {
    src: Kulawa,
    alt: "Fundacja kulawa Warszawa",
  },
  {
    src: Tranzycja,
    alt: "logo Tranzycja.pl",
  },
  {
    src: Rozowa,
    alt: "Logo Róźowa Skrzyneczka",
  },
  {
    src: Chemia,
    alt: "Logo Kolektyw Chemia",
  }
];

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

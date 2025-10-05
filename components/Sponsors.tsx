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
    href: "https://offschool.edu.pl/",
  },
  {
    src: Kulawa,
    alt: "Fundacja kulawa Warszawa",
    href: "https://www.kulawawarszawa.pl/"

  },
  {
    src: Tranzycja,
    alt: "logo Tranzycja.pl",
    href: "https://tranzycja.pl/"
  },
  {
    src: Rozowa,
    alt: "Logo Róźowa Skrzyneczka",
    href: "https://rozowaskrzyneczka.pl/"
  },
  {
    src: Chemia,
    alt: "Logo Kolektyw Chemia",
    href: "https://www.facebook.com/KolektywChemia/"
  }
];

const Sponsors = () => {
  return (
    <HomeSection className="flex flex-col justify-start items-center py-28 md:py-20 font-outfit text-eblue">
      <h1 className="text-3xl md:text-4xl">Matronat platformy</h1>
      <div className="h-7" />
      <a href="https://magovox.pl/" target="_blank" rel="noopener noreferrer">
        <Image src={MagoVox} alt="Mago Vox" />
      </a>
      <div className="h-10 md:h-24" />
      <h2 className="text-xl md:text-4xl text-center">
        Organizacje partnerskie oraz wspierające <br /> nasze działania
      </h2>
      <div className="h-18" />
      <section className="flex flex-wrap justify-center gap-8 pt-10">
        {sponsorsData.map((sponsor, index) => (
          <a
            href={sponsor.href}
            key={index}
            className="relative w-24 md:w-40 h-24 md:h-40"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              fill
              src={sponsor.src}
              sizes="(max-width: 768px) 96px, 160px"
              alt={sponsor.alt}
            />
          </a>
        ))}
      </section>
    </HomeSection>
  );
};

export default Sponsors;

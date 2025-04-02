import React from "react";
import Image from "next/image";
import HomeSection from "./HomeSection";
import { Accordion, AccordionItem, AccordionContent } from "./Accordion";
import { AccordionTrigger as RadixTrigger } from "@radix-ui/react-accordion";
import bwPestki from "../public/images/dziewczyny.png";
import bwKapczuk from "../public/images/kapczuk.png";

type AboutUsSectionProps = {
  img: any;
  caption: string | undefined;
  children: React.ReactNode;
  h1: React.ReactNode;
  alt: string;
};

const aboutUsSections = [
  {
    alt: "Pestki",
    img: bwPestki,
    caption: 'fot. Maria Kniaginin-Ciszewska',
    h1: (
      <span>
        Fundacja <br /> Bezpestkowe
      </span>
    ),
    children: (
      <Accordion
        className="md:order-3 md:font-light text-base md:text-xl"
        type="single"
        collapsible
      >
        <p>
          Bezpestkowe to projekt założony w 2018 roku, którego celem jest nie
          tylko aktywne wspieranie osób z zespołem
          Mayera-Rokitansky&apos;ego-Küstera-Hausera, ale również uświadamianie
          i edukowanie społeczeństwa.
        </p>
        <AccordionItem value="kapczuk-akordeon">
          <AccordionContent className="text-base md:text-xl">
            Nazwa nawiązuje do pestki owocu i przyrównania jej do macicy — owoce
            pestkowe różnią się od bezpestkowych tylko posiadaniem pestki, która
            przecież niczego nie definiuje. W 2022 roku Bezpestkowe zostały
            sformalizowane i stanowią Fundację.
          </AccordionContent>
          <RadixTrigger asChild>
            <button className="mt-8 py-3 hover:text-electric-600 btn btn-primary">
              Czytaj dalej
            </button>
          </RadixTrigger>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    alt: "Dr Kapczuk",
    img: bwKapczuk,
    caption: undefined,
    h1: "dr hab. n. med.  Karina Kapczuk",
    children: (
      <Accordion
        className="md:order-3 md:font-light text-base md:text-xl"
        type="single"
        collapsible
      >
        <p>
          Lekarz, specjalista ginekolog-położnik, endokrynolog oraz ginekolog
          wieku rozwojowego (IFEPAG I i II). Pracuje w Klinice Ginekologii
          Uniwersytetu Medycznego (UM) im. K. Marcinkowskiego w Poznaniu w
          Ginekologiczno-Położniczym Szpitalu Klinicznym UM w Poznaniu.
        </p>
        <AccordionItem value="kapczuk-akordeon">
          <AccordionContent className="text-base md:text-xl">
            Główny obszar aktywności zawodowej, klinicznej i naukowej, stanowią
            ginekologia dziecięca i dziewczęca oraz złożone wady rozwojowe
            żeńskich narządów płciowych, w tym zespół MRKH.Lekarz, specjalista
            ginekolog-położnik, endokrynolog oraz ginekolog wieku rozwojowego
            (IFEPAG I i II). Pracuje w Klinice Ginekologii Uniwersytetu
            Medycznego (UM) im. K. Marcinkowskiego w Poznaniu w
            Ginekologiczno-Położniczym Szpitalu Klinicznym UM w Poznaniu. Oraz w
            Klinice Endokrynologii i Reumatologii Wieku Rozwojowego w Szpitalu
            Klinicznym im. K. Jonschera UM w Poznaniu. Główny obszar aktywności
            zawodowej, klinicznej i naukowej, stanowią ginekologia dziecięca i
            dziewczęca oraz złożone wady rozwojowe żeńskich narządów płciowych,
            w tym zespół MRKH.
          </AccordionContent>
          <RadixTrigger asChild>
            <button className="mt-8 py-3 hover:text-electric-600 btn btn-primary">
              Czytaj dalej
            </button>
          </RadixTrigger>
        </AccordionItem>
      </Accordion>
    ),
  },
];

const AboutUsSection = ({ img, children, h1, alt, caption }: AboutUsSectionProps) => (
  <section className="relative flex flex-col gap-8 md:grid md:grid-cols-2 pb-20 md:pb-28 font-outfit">
    <h1 className="md:order-2 pb-3 border-b-[1.5px] border-b-electric-400 text-3xl md:text-4xl">
      {h1}
    </h1>
    <figure className="md:order-1 row-span-2">
      <Image src={img} width={400} loading="lazy" alt={alt} />
      {caption && (
        <figcaption className="opacity-25 text-greyish">{caption}</figcaption>
      )}
    </figure>
    {children}
  </section>
);

const AboutUs = () => {
  return (
    <HomeSection
      id="o-nas"
      className="flex flex-col justify-center pt-20 text-eblue"
    >
      <h1 className="md:hidden pb-16 font-monarcha text-5xl">O nas</h1>
      <h1 className="hidden md:inline pb-24 font-monarcha text-5xl">
        Poznaj nas
      </h1>
      {aboutUsSections.map((section, index) => (
        <AboutUsSection key={index} {...section} />
      ))}
    </HomeSection>
  );
};

export default AboutUs;

import type { Meta, StoryObj } from "@storybook/react";
import AboutUs from "@/components/AboutUs";
import React from "react";
import bwPestki from "../public/images/bw-pestki.png";
import bwKapczuk from "../public/images/bw-kapczuk.png";
import { Accordion, AccordionItem, AccordionContent } from "@/components/Accordion";
import { AccordionTrigger as RadixTrigger } from "@radix-ui/react-accordion";

const meta = {
  title: "Home/AboutUs",
  component: AboutUs,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AboutUs>;

export default meta;
type Story = StoryObj<typeof meta>;

const aboutUsSections = [
  {
    alt: "Pestki",
    img: bwPestki,
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
          Bezpestkowe to projekt założony w 2018 roku, którego celem jest
          nie tylko aktywne wspieranie osób z zespołem
          Mayera-Rokitansky'ego-Küstera-Hausera, ale również uświadamianie i
          edukowanie społeczeństwa.
        </p>
        <AccordionItem value="kapczuk-akordeon">
          <AccordionContent className="md:text-xl">
            Nazwa nawiązuje do pestki owocu i przyrównania jej do macicy —
            owoce pestkowe różnią się od bezpestkowych tylko posiadaniem
            pestki, która przecież niczego nie definiuje. W 2022 roku
            Bezpestkowe zostały sformalizowane i stanowią Fundację.
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
    h1: "dr hab. n. med.  Karina Kapczuk",
    children: (
      <Accordion
        className="md:order-3 md:font-light text-base md:text-xl"
        type="single"
        collapsible
      >
        <p>
          Lekarz, specjalista ginekolog-położnik, endokrynolog oraz
          ginekolog wieku rozwojowego (IFEPAG I i II). Pracuje w Klinice
          Ginekologii Uniwersytetu Medycznego (UM) im. K. Marcinkowskiego w
          Poznaniu w Ginekologiczno-Położniczym Szpitalu Klinicznym UM w
          Poznaniu.
        </p>
        <AccordionItem value="kapczuk-akordeon">
          <AccordionContent className="md:text-xl">
            Główny obszar aktywności zawodowej, klinicznej i naukowej,
            stanowią ginekologia dziecięca i dziewczęca oraz złożone wady
            rozwojowe żeńskich narządów płciowych, w tym zespół MRKH.Lekarz,
            specjalista ginekolog-położnik, endokrynolog oraz ginekolog
            wieku rozwojowego (IFEPAG I i II). Pracuje w Klinice Ginekologii
            Uniwersytetu Medycznego (UM) im. K. Marcinkowskiego w Poznaniu w
            Ginekologiczno-Położniczym Szpitalu Klinicznym UM w Poznaniu.
            Oraz w Klinice Endokrynologii i Reumatologii Wieku Rozwojowego w
            Szpitalu Klinicznym im. K. Jonschera UM w Poznaniu. Główny
            obszar aktywności zawodowej, klinicznej i naukowej, stanowią
            ginekologia dziecięca i dziewczęca oraz złożone wady rozwojowe
            żeńskich narządów płciowych, w tym zespół MRKH.
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

export const Desktop: Story = {
  args: {
    sections: aboutUsSections,
  },
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};

export const Mobile: Story = {
  args: {
    sections: aboutUsSections,
  },
  parameters: {
    viewport: { defaultViewport: "mobile" },
  },
};
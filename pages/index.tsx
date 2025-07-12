import type { NextPage } from "next";
import React from "react";
import "../public/trailer.mp4";

// Components
import { Intro } from "@/components/Intro";
import Pitch from "@/components/Pitch";
import OpisKursu from "@/components/OpisKursu";
import DowiedzSie from "@/components/DowiedzSie";
import ProgramFull, { AccordionItemData } from "@/components/ProgramFull";
import DlaKogo, {
  AccordionItemData as DlaKogoItemData,
} from "@/components/DlaKogo";
import KursWLiczbach, { KursWLiczbachItem } from "@/components/KursWLiczbach";
import AboutUs from "@/components/AboutUs";
import KupKursSection from "@/components/KupKursSection";
import FAQ from "@/components/FAQ";
import Sponsors from "@/components/Sponsors";
import Newsletter from "@/components/Newsletter";

// Images
import ff from "../public/images/ff.png";
import kulawa from "../public/images/kulawa.png";
import tranzycja from "../public/images/tranzycja.png";
import skrzyneczka from "../public/images/skrzyneczka.png";
import kolektyw from "../public/images/kolektyw-chemia.png";
import mago from "../public/images/mago-vox.png";

// Accordion Components
import { Promo } from "@/components/Promo";

const Home: NextPage = () => {
  return (
    <>
      <Intro />
      <Promo />
      <Pitch />
      <OpisKursu />
      <DowiedzSie />
      <ProgramFull accordions={accordions} />
      <DlaKogo items={dlaKogoItems} />
      <KursWLiczbach items={kursWLiczbachItems} />
      <AboutUs />
      <KupKursSection />
      <FAQ />
      <Sponsors />
      <Newsletter />
    </>
  );
};

export default Home;

// Data for components
const accordions: AccordionItemData[] = [
  [
    "dwuczęściowe wideo",
    "dzięki któremu poznasz perspektywę pacjencką i ekspercką na temat komunikacji w gabinecie medycznym",
  ],
  [
    "zestaw fiszek",
    "stworzonych przez dr Karinę Kapczuk w celu przeprowadzenia wspierającej rozmowy z rodzicami osób z zespołem MRKH",
  ],
  [
    "dwie broszury",
    "stworzone przez Fundację Bezpestkowe na temat zespołu MRKH oraz towarzyszących mu kwestiach",
  ],
  [
    "publikację",
    "która stanowi podsumowanie badań przeprowadzonych przez Agatą Śmiałkowską na temat przygotowania osób studiujących kierunek lekarski do rozmów z pacjentami",
  ],
  ["quiz", "mający na celu sprawdzenie twojej wiedzy z kursu"],
  ["certyfikat", "potwierdzający, że MRKH to dla ciebie pestka! "],
];

const dlaKogoItems: DlaKogoItemData[] = [
  [
    "Lekarek i lekarzy",
    "Jeśli jesteś specjalistką lub specjalistą, która/y pragnie lepiej zrozumieć perspektywę pacjentek oraz skuteczniej rozpoznawać i przekazywać informacje na temat zespołu MRKH, ten materiał jest dla Ciebie.",
  ],
  [
    "Studentek i studentów",
    "Jeśli studiujesz kierunek lekarski i chcesz rozwijać umiejętności w zakresie komunikacji z pacjentkami, ten kurs pomoże Ci zrozumieć, jak rozmawiać o niekiedy trudnych kwestiach związanych z zespołem MRKH.",
  ],
  [
    "Specjalistek i specjalistów",
    "Pracujesz na co dzień z pacjentkami jako psycholożka/psycholog, terapeutka/terapeuta, urofizjoterapeutka/urofizjoterapeuta? Dowiedz się, jak budować zaufanie i wspierać pacjentki w rozmowach o zespole MRKH.",
  ],
  [
    "Bliskich",
    "Jeśli bliska Ci osoba ma zespół MRKH i chcesz zrozumieć jej sytuację oraz dowiedzieć się więcej o tym zespole, znajdziesz tu wartościowe informacje.",
  ],
];

const kursWLiczbachItems: KursWLiczbachItem[] = [
  ["13", "tyle rodziałów ma nasz kurs "],
  ["8", "tyle wykładów przeprowadziłyśmy na uczelniach medycznych w Polsce"],
  [
    "70",
    <span key="70">
      tyle minut trwa wideo
      <br /> zawarte w naszym kursie
    </span>,
  ],
  [
    "10K",
    "to liczba wydrukowanych przez nas broszur, które dystrybuujemy w całej Polsce",
  ],
];

;

const sponsorItems = [
  { src: ff, alt: "Fundacja Feminoteka" },
  { src: kulawa, alt: "Kulawa Warszawa" },
  { src: tranzycja, alt: "Tranzycja" },
  { src: skrzyneczka, alt: "Skrzyneczka" },
  { src: kolektyw, alt: "Kolektyw Chemia" },
  { src: mago, alt: "Mago Vox" },
];

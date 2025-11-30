import type { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
// Components
import ProgramFull from "@/components/ProgramFull";
import DlaKogo, {
  AccordionItemData as DlaKogoItemData,
} from "@/components/DlaKogo";
import KursWLiczbach, { KursWLiczbachItem } from "@/components/KursWLiczbach";
import { getKursEnabled } from "@/utils/getKursEnabled";

type Props = {
  kursEnabled: boolean;
}

const ProgramPage: NextPage<Props> = () => {
  return (
    <>
      <ProgramFull />
      <DlaKogo items={dlaKogoItems} />
      <KursWLiczbach items={kursWLiczbachItems} />
    </>
  );
};

export const getServerSideProps = async (_context: GetServerSidePropsContext): Promise<{ props: Props }> => {
  return {
    props: {
      kursEnabled: getKursEnabled(),
    }
  };
};

export default ProgramPage;

// Data for components
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
  [
    "70",
    <span key="70">
      tyle minut trwa wideo
      <br /> zawarte w naszym kursie
    </span>,
  ],
  ["13", "tyle rodziałów ma nasz kurs "],
  ["13", "tyle warsztatów i wykładów przeprowadziłyśmy na uczelniach medycznych w Polsce"],
  [
    "10K",
    "to liczba wydrukowanych przez nas broszur, które dystrybuujemy w całej Polsce",
  ],
];


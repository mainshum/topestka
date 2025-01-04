import type { NextPage } from "next";
import clsx from "clsx";
import React from "react";
import Image from "next/image";
import kapczuk from "../public/images/kapczuk.jpeg";
import pestki from "../public/images/dziewczyny.jpeg";
import bwPestki from "../public/images/bw-pestki.png";
import bwKapczuk from "../public/images/bw-kapczuk.png";

// sponsorzy
import ff from "../public/images/ff.png";
import kulawa from "../public/images/kulawa.png";
import tranzycja from "../public/images/tranzycja.png";
import skrzyneczka from "../public/images/skrzyneczka.png";
import kolektyw from "../public/images/kolektyw-chemia.png";
import mago from "../public/images/mago-vox.png";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/Accordion";
import { AccordionTrigger as RadixTrigger } from "@radix-ui/react-accordion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils/misc";

// eslint-disable-next-line react/display-name
export const HomeSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"section">
>(({ children, className }) => {
  return <section className={clsx("min-h-svh", className)}>{children}</section>;
});

export const PromoVideo = () => {
  return (
    <HomeSection className="flex justify-center items-center bg-ewhite">
      <video
        className="rounded"
        controls
        poster="/images/pestki.png"
        width="400"
        height="300"
      />
    </HomeSection>
  );
};

const PoznajNas = () => {
  return (
    <HomeSection className="flex flex-col gap-28 pt-24 pb-24">
      <h1 className="pb-24 text-6xl monarcha-60">Poznaj nas!</h1>
      <section className="flex justify-start items-center gap-28">
        {/* todo is it bad to have explicit width and height? */}
        <Image className="rounded" width={400} src={pestki} alt="Dziewczyny" />
        <div className="whitespace-break-spaces">
          <h2 className="pb-4 border-b border-b-electricOrange outfit-44">
            Fundacja
            <br />
            Bezpestkowe
          </h2>
          <p className="pt-14 pb-16 outfit-22">
            Bezpestkowe to projekt założony w 2018 roku,
            <br />
            którego celem jest nie tylko aktywne wspieranie <br />
            osób z zespołem Mayera-Rokitansky’ego-Küstera-Hausera,
            <br />
            ale również uświadamianie i edukowanie społeczeństwa.
          </p>
          <button className="btn btn-primary">Czytaj dalej</button>
        </div>
      </section>
      <section className="flex justify-start items-center gap-28">
        {/* todo is it bad to have explicit width and height? */}
        <Image className="rounded" width={400} src={kapczuk} alt="Dziewczyny" />
        <div className="whitespace-break-spaces">
          <h2 className="pb-4 border-b border-b-electricOrange outfit-44">
            dr hab. n. med.
            <br />
            Karina Kapczuk
          </h2>
          <p className="pt-14 pb-16 outfit-22">
            Lekarz, specjalista ginekolog-położnik,
            <br />
            endokrynolog oraz ginekolog wieku<br></br>rozwojowego (IFEPAG I i
            II). Pracuje w Klinice<br></br>Ginekologii Uniwersytetu Medycznego
            (UM) im.<br></br>K. Marcinkowskiego w Poznaniu w Ginekologiczno-
            <br />
            Położniczym Szpitalu Klinicznym UM w Poznaniu.
          </p>
          <button className="btn btn-primary">Czytaj dalej</button>
        </div>
      </section>
    </HomeSection>
  );
};

const Pitch = () => {
  return (
    <HomeSection className="flex flex-col justify-center items-start bg-eblue pr-5 pl-5 text-ewhite">
      <h3 className="text-electric-400 body-small">
        Zdobywaj kompleksową wiedzę od pacjentek i ekspertek o zespole MRKH, by
        zapewniać najwyższy standard opieki.
      </h3>
      <h2 className="pt-6 pb-11 heading-03">
        Kurs pomoże Ci lepiej przekazywać diagnozę w sposób rzetelny,
        wspierający i budujący poczucie bezpieczeństwa.
      </h2>
      <button className="btn btn-secondary">Poznaj pełen program </button>
    </HomeSection>
  );
};

export const Intro = () => {
  return (
    <HomeSection className="flex flex-col justify-center items-center pr-6 pl-6">
      <h1 className="font-medium text-nowrap outfit-82 sm:outfit-128">
        to pestka!
      </h1>
      <h2 className="pt-3 pb-10 sm:pb-14 lg:pb-5 text-center lg:monarcha-42 monarcha-22">
        dowiedz się w jaki sposób przekazywać informacje o zespole MRKH
      </h2>
      <section className="flex lg:flex-row flex-col items-center gap-4 space-x-3">
        {/* todo use a button component */}
        <button className="text-xl btn btn-primary">Kup kurs</button>
        <button className="border-electric-500 border text-xl btn btn-secondary">
          Poznaj program
        </button>
      </section>
    </HomeSection>
  );
};

const OpisKursu = () => {
  return (
    <HomeSection className="flex flex-col justify-center items-center">
      <h1 className="pr-10 pb-20 pl-10 font-monarcha text-4xl">
        Nasz kurs dostarczy Ci kompleksowej wiedzy o zespole MRKH w pracy
        lekarza
      </h1>
      <section className="flex flex-col items-center gap-9 pr-7 pl-7">
        <p className="pl-3 border-l-[1.5px] border-l-eblue font-normal font-outfit text-electric-500 text-xl">
          Program kursu pogłębia wiedzę o aspekty medyczne i psychologiczne
          związane z zespołem MRKH.
        </p>
        <p className="pl-3 border-l-[1.5px] border-l-eblue font-normal font-outfit text-electric-500 text-xl">
          Dzięki temu lekarze i studenci mogą przekazywać pacjentkom pełne i
          rzetelne informacje, budując w ten sposób ich poczucie bezpieczeństwa
          i zapewniając lepszą opiekę medyczną.
        </p>
      </section>
    </HomeSection>
  );
};

const OfferingList = ({ items }: { items: string[] }) => {
  return (
    <ul className="space-y-2 p-0 pb-4 border-b-[1.5px] border-b-ewhite list-none" role="list">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <ChevronRight
            className="flex-shrink-0"
            size={16}
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

const OfferingSection = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <section className={cn("flex flex-col items-stretch gap-8 bg-eblue pt-10 pr-5 pb-10 pl-5 rounded-lg text-ewhite", className)}>
    {children}
  </section>
);


const Home: NextPage = () => {
  return (
    <>
      <Intro />
      {/* <PromoVideo /> */}
      <Pitch />
      <OpisKursu />
      <HomeSection className="flex flex-col justify-center bg-eblue pr-10 pl-10 text-ewhite">
        <h1 className="pb-12 font-outfit text-4xl/none">
          Dowiedz się jak kluczowe znaczenie ma:
        </h1>
        <section className="pb-8 font-monarcha">
          <h2 className="pb-1 border-b-[1.5px] border-b-electric-500 text-xl/tight">
            Empatyczne <br />
            przekazywanie diagnozy
          </h2>
          <p className="pt-4 text-base/tight">
            Dowiedz się, jak rzetelnie i z szacunkiem przekazać diagnozę zespołu
            MRKH. Kurs dostarcza wskazówek, jak prowadzić rozmowy w sposób
            wspierający, uwzględniając emocje pacjentki i budując z nią poczucie
            zaufania.
          </p>
        </section>
        <section className="font-monarcha">
          <h2 className="pb-1 border-b-[1.5px] border-b-electric-500 text-lg/tight">
            Wsparcie psychiczne i zrozumienie pacjentek
          </h2>
          <p className="pt-4 text-base/tight">
            Kurs pozwala głębiej zrozumieć psychologiczne wyzwania i potrzeby
            pacjentek z zespołem MRKH. Dzięki wiedzy od osób z własnym
            doświadczeniem, nauczysz się, jak okazać prawdziwe wsparcie, które
            ułatwia pacjentkom proces akceptacji diagnozy.
          </p>
        </section>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center gap-12 bg-ewhite pr-10 pl-10 text-eblue">
        <h1 className="font-outfit text-7xl/none">Sprawdź nasz program!</h1>
        <p className="font-monarcha text-2xl/none">
          Kurs zawiera elementy przeznaczone do oglądania, czytania oraz część
          interaktywną.
        </p>
        <section>
          {accordions.map(([title, content]) => (
            <Accordion key={title} type="single" collapsible>
              <AccordionItem value={title}>
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>{content}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </section>
      </HomeSection>
      <HomeSection className="flex-col items-center gap-16 bg-ewhite pr-10 pl-10 font-outfit text-eblue">
        <h1 className="font-medium text-7xl/none">Dla kogo?</h1>
        <p className="text-3xl/none text-electric-400">
          To kurs dla lekarek, studentów, bliskich oraz specjalistek, dajcie
          opis:)
        </p>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center gap-16 bg-eblue pr-6 pl-6 font-outfit text-ewhite">
        <h1 className="font-medium font-monarcha text-5xl/none text-electric-500">
          Kurs w <br /> liczbach
        </h1>
        <section>
          {kursWLiczbach.map(([liczba, opis]) => (
            <div
              className="flex justify-between items-center gap-8 border-ewhite pt-3 pb-3 border-b-[1px]"
              key={liczba}
            >
              <span className="text-6xl">{liczba}</span>
              <span className="text-right font-normal text-sm">{opis}</span>
            </div>
          ))}
        </section>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center bg-ewhite pt-20 pr-10 pl-10 text-eblue">
        <h1 className="pb-16 font-outfit text-5xl/none">O nas</h1>
        <AboutUsSection alt="Pestki" img={bwPestki} h1="Fundacja bezpestkowe">
          <Accordion type="single" collapsible>
            <p className="pb-8">
              Bezpestkowe to projekt założony w 2018 roku, którego celem jest
              nie tylko aktywne wspieranie osób z zespołem
              Mayera-Rokitansky’ego-Küstera-Hausera, ale również uświadamianie i
              edukowanie społeczeństwa.
            </p>
            <AccordionItem value="kapczuk-akordeon">
              <AccordionContent className="text-base">
                Nazwa nawiązuje do pestki owocu i przyrównania jej do macicy —
                owoce pestkowe różnią się od bezpestkowych tylko posiadaniem
                pestki, która przecież niczego nie definiuje. W 2022 roku
                Bezpestkowe zostały sformalizowane i stanowią Fundację.
              </AccordionContent>
              <RadixTrigger asChild>
                <button className="btn btn-primary">Czytaj więcej</button>
              </RadixTrigger>
            </AccordionItem>
          </Accordion>
        </AboutUsSection>
        <AboutUsSection
          alt="Dr Kapczuk"
          img={bwKapczuk}
          h1="dr hab. n. med.  Karina Kapczuk"
        >
          <Accordion type="single" collapsible>
            <p className="pb-8">
              Lekarz, specjalista ginekolog-położnik, endokrynolog oraz
              ginekolog wieku rozwojowego (IFEPAG I i II). Pracuje w Klinice
              Ginekologii Uniwersytetu Medycznego (UM) im. K. Marcinkowskiego w
              Poznaniu w Ginekologiczno-Położniczym Szpitalu Klinicznym UM w
              Poznaniu.
            </p>
            <AccordionItem value="kapczuk-akordeon">
              <AccordionContent className="text-base">
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
                <button className="btn btn-primary">Czytaj więcej</button>
              </RadixTrigger>
            </AccordionItem>
          </Accordion>
        </AboutUsSection>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center gap-12 pr-6 pl-6">
        <OfferingSection>
          <h1 className="text-3xl/none text-center">MRKH to pestka!</h1>
          <div className="flex flex-col flex-grow-2 gap-4 pb-4 border-b-[1.5px] border-b-ewhite">
            <span>cena</span>
            <span className="text-3xl/none">299 (PLN brutto)</span>
          </div>
          <div className="flex flex-col items-start gap-4 pb-4 border-b-[1.5px] border-b-ewhite">
            <span className="bg-electric-500 pt-1 pr-2 pb-1 pl-2 rounded-lg grow-0 text-ewhite">
              cena do końca roku
            </span>
            <span className="text-3xl/none">200 (PLN brutto)</span>
          </div>
          <button className="text-xl/none btn btn-secondary self-center">
            Kup kurs
          </button>
        </OfferingSection>
        <OfferingSection className="gap-4">
          <h1 className="pb-4 border-b-[1.5px] border-b-ewhite text-3xl/none">
            Kurs zawiera
          </h1>
          <OfferingList
            items={[
              "ponad godzinny materiał video",
              "badania dotyczące komunikacji",
              "materiały edukacyjne na temat zespołu MRKH ",
              "quiz, dzięk któremu sprawdzisz, czy MRKH to pestka!",
              "certyfikat ukończenia kursu od Fundacji Bezpestkowe",
            ]}
          />
          <span/>
          <button className="border-2 border-orange-400 text-xl/none btn btn-primary self-center">
            Poznaj program
          </button>
        </OfferingSection>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center items-center gap-8 bg-ewhite px-8 py-20 text-eblue">
        <p className="text-lg/snug">Dołącz do naszego newslettera aby nie przegapić oferty!</p>
        <button className="text-sm btn btn-primary">Zapisz się</button>
      </HomeSection>
      <HomeSection className="flex flex-col gap-2 bg-eblue px-4 pt-36 pb-20 text-ewhite"> 
        <h1 className="pb-10 text-3xl/none">F.A.Q</h1>
        {faqs.map(([question, answer]) => (
          <Accordion key={question} type="single" collapsible>
            <AccordionItem value={question}>
              <AccordionTrigger chevProps={{
                className: "text-ewhite"
              }} className="border-ewhite border-b-[1px] border-solid text-sm">{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </HomeSection>
      <HomeSection className="flex flex-col justify-center items-center gap-8 bg-ewhite px-8 text-eblue">
        <a href="#sponsorzy"/>
        <h1 className="text-center text-xl/snug">Organizacje partnerskie oraz wspierające nasze działania</h1>
        <section className="flex flex-wrap justify-center gap-8">
          <Image src={ff} alt="Fundacja Feminoteka" />
          <Image src={kulawa} alt="Kulawa Warszawa" />
          <Image src={tranzycja} alt="Tranzycja" />
          <Image src={skrzyneczka} alt="Skrzyneczka" />
          <Image src={kolektyw} alt="Kolektyw Chemia" />
          <Image src={mago} alt="Mago Vox" />
        </section>
      </HomeSection>
    </>
  );
};

type AboutUsProps = {
  img: StaticImport;
  alt: string;
  h1: string;
  children: React.ReactNode;
};

const faqs = [
  [
    'Jak mogę zapłacić za kurs?',
    ''
  ],
  [
    'Czy oferujecie faktury VAT?',
    ''
  ],
  [
    'Studiuję, czy mogę liczyć na zniżkę?',
    ''
  ],
  [
    'Nie jestem lekarzem, czy ten kurs jest dla mnie?',
    ''
  ],
  [
    'Jak mogę wspierać osoby z zespołem MRKH?',
    ''
  ],
  [
    'Co zawiera kurs i ile trwa?',
    ''
  ],
  [
    'Kurs dotyczy zespołu MRKH. Czy znajdę w nim uniwersalne treści?',
    ''
  ],
  [
    'Dlaczego to wy współprowadzicie kurs?',
    ''
  ],
  [
    'Czy po ukończeniu kursu otrzymam certyfikat?',
    ''
  ],
  [
    'Czy mogę w jakiś sposób wesprzeć działania fundacji?',
    ''
  ]
];


const AboutUsSection = ({ img, children, h1, alt }: AboutUsProps) => (
  <section className="flex flex-col gap-8 pb-20">
    <h1 className="pb-3 border-b-[1.5px] border-b-electric-400 text-3xl/none">
      {h1}
    </h1>
    <Image src={img} loading="lazy" alt={alt} />
    {children}
  </section>
);

export default Home;

const kursWLiczbach = [
  ["70", "tyle minut trwa wideo zawarte w naszym kursie"],
  ["13", "tyle rodziałów ma nasz kurs "],
  ["8", "tyle wykładów przeprowadziłyśmy na uczelniach medycznych w Polsce"],
  [
    "10K",
    "to liczba wydrukowanych przez nas broszur, które dystrybuujemy w całej Polsce",
  ],
];

const accordions = [
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
  ["certyfikat", "potwierdzający, że MRKH to dla ciebie pestka! "],
];

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
import { Input } from "@/components/Input";
import Link from "next/link";

// eslint-disable-next-line react/display-name
export const HomeSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"section">
>(({ children, className }) => {
  return (
    <section className={clsx("px-6 lg:px-32 pt-36 pb-20 min-h-svh", className)}>
      {children}
    </section>
  );
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

export const Intro = () => {
  return (
    <HomeSection className="flex flex-col justify-center items-center lg:gap-5 px-6">
      <h1 className="font-medium font-outfit text-7xl/none text-nowrap lg:text-8xl">to pestka!</h1>
      <h2 className="pt-6 pb-14 lg:pb-5 font-monarcha text-center text-lg/tight lg:text-4xl/tight">
        dowiedz się w jaki sposób przekazywać <br className="lg:inline hidden"></br> informacje o zespole MRKH
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

const SmLinebreak = () => <br className="lg:hidden" />
const LgLinebreak = () => <br className="lg:inline hidden" />

const Pitch = () => {
  return (
    <HomeSection className="flex flex-col justify-center items-start bg-eblue px-5 lg:px-20 font-monarcha text-ewhite">
      <h3 className="text-electric-500 text-sm">
        Zdobywaj kompleksową wiedzę od pacjentek i ekspertek o zespole MRKH, by
        zapewniać najwyższy standard opieki.
      </h3>
      <h2 className="pt-6 pb-11 text-2xl/tight lg:text-5xl/tight">
        Kurs pomoże Ci lepiej przekazywać diagnozę w sposób rzetelny, <SmLinebreak />
        wspierający i budujący poczucie bezpieczeństwa.
      </h2>
      <button className="btn btn-secondary">Poznaj pełen program </button>
    </HomeSection>
  );
};

const OpisKursu = () => {
  return (
    <HomeSection className="flex flex-col justify-evenly items-center lg:py-0">
      <h1 className="pb-20 lg:pb-0 font-monarcha text-3xl/tight lg:text-7xl/tight">
        Nasz kurs dostarczy Ci kompleksowej wiedzy o <SmLinebreak /> zespole MRKH w pracy
        lekarza
      </h1>
      <section className="flex flex-col items-start gap-9">
        <p className="pl-3 border-l-[1.5px] border-l-eblue font-normal font-outfit text-electric-600 lg:text-2xl">
          Program kursu pogłębia wiedzę o aspekty medyczne i psychologiczne
          związane z zespołem MRKH.
        </p>
        <p className="pl-3 border-l-[1.5px] border-l-eblue font-normal font-outfit text-electric-600 lg:text-2xl">
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
    <ul
      className="space-y-2 py-4 p-0 border-b-[1.5px] border-b-ewhite list-none"
      role="list"
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2 font-serif">
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

const OfferingSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={cn(
      "flex flex-col items-stretch gap-8 bg-eblue pt-10 pr-5 pb-10 pl-5 rounded-lg text-ewhite",
      className
    )}
  >
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
      <HomeSection className="flex flex-col justify-center gap-12 bg-ewhite px-10 pb-0 text-eblue">
        <h1 className="font-medium font-outfit text-6xl/none">
          Sprawdź nasz program!
        </h1>
        <p className="font-monarcha text-lg/tight">
          Kurs zawiera elementy przeznaczone do oglądania, czytania oraz część
          interaktywną.
        </p>
        <section>
          {accordions.map(([title, content]) => (
            <Accordion key={title} type="single" collapsible>
              <AccordionItem value={title}>
                <AccordionTrigger className="pb-4 font-medium">
                  {title}
                </AccordionTrigger>
                <AccordionContent>{content}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </section>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center items-center gap-20 bg-ewhite px-10 pt-0 pb-0 font-outfit text-eblue">
        <h1 className="font-medium text-7xl/none">Dla kogo?</h1>
        <p className="text-3xl/tight text-electric-500">
          To kurs dla lekarek, studentów, bliskich oraz specjalistek, dajcie opis :)
        </p>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center gap-16 bg-eblue px-6 font-outfit text-ewhite">
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
      <HomeSection className="flex flex-col justify-center bg-ewhite pt-20 text-eblue">
        <h1 className="pb-16 font-monarcha text-5xl/none">O nas</h1>
        <AboutUsSection alt="Pestki" img={bwPestki} h1={<span>Fundacja <br /> Bezpestkowe</span>}>
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
                <button className="py-3 btn btn-primary">Czytaj dalej</button>
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
                <button className="btn btn-primary">Czytaj dalej</button>
              </RadixTrigger>
            </AccordionItem>
          </Accordion>
        </AboutUsSection>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center gap-12 pr-6 pl-6">
        <OfferingSection>
          <h1 className="font-serif text-3xl/none text-center">MRKH to pestka!</h1>
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
          <button className="py-4 text-xl/none btn btn-secondary self-center">
            Kup kurs
          </button>
        </OfferingSection>
        <OfferingSection className="gap-3">
          <h1 className="pb-4 border-b-[1.5px] border-b-ewhite text-3xl/none">
            Kurs zawiera
          </h1>
          <OfferingList
            items={[
              "ponad godzinny materiał video",
              "badania dotyczące komunikacji",
              "materiały edukacyjne na temat zespołu MRKH ",
              "quiz, dzięki któremu sprawdzisz, czy MRKH to pestka!",
              "certyfikat ukończenia kursu od Fundacji Bezpestkowe",
            ]}
          />
          <span />
          <button className="border-2 border-orange-400 py-4 text-xl/none btn btn-primary self-center">
            Poznaj program
          </button>
        </OfferingSection>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center items-center gap-8 bg-ewhite px-8 pt-0 min-h-0 text-eblue">
        <p className="text-lg/snug">
          Dołącz do naszego newslettera aby nie przegapić oferty!
        </p>
        <button className="text-sm btn btn-primary">Zapisz się</button>
      </HomeSection>
      <HomeSection className="flex flex-col gap-2 bg-eblue px-4 text-ewhite">
        <h1 className="pb-10 text-3xl/none">F.A.Q</h1>
        {faqs.map(([question, answer]) => (
          <Accordion key={question} type="single" collapsible>
            <AccordionItem value={question}>
              <AccordionTrigger
                chevProps={{
                  className: "text-ewhite shrink-0",
                }}
                className="border-ewhite border-b-[1px] border-solid text-sm"
              >
                {question}
              </AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </HomeSection>
      <HomeSection className="flex flex-col justify-center items-center gap-8 bg-ewhite px-8 text-eblue">
        <h1 className="text-center text-xl/snug">
          Organizacje partnerskie oraz wspierające nasze działania
        </h1>
        <section className="flex flex-wrap justify-center gap-8">
          <Image src={ff} alt="Fundacja Feminoteka" />
          <Image src={kulawa} alt="Kulawa Warszawa" />
          <Image src={tranzycja} alt="Tranzycja" />
          <Image src={skrzyneczka} alt="Skrzyneczka" />
          <Image src={kolektyw} alt="Kolektyw Chemia" />
          <Image src={mago} alt="Mago Vox" />
        </section>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center items-center gap-20 bg-eblue pt-20 pb-5 text-ewhite">
        <section className="flex flex-col items-center gap-4 w-full">
          <h1 className="font-monarcha text-2xl/tight">
            Dołącz do naszego newslettera:
          </h1>
          <div className="flex w-full">
            <Input
              className="border-x-0 pl-0 border-t-0 border-b-[1px] border-b-ewhite rounded-none text-sm placeholder:text-electric-500"
              type="email"
              placeholder="Twój email"
            />
            <button
              type="submit"
              className="px-2 rounded-full focus:ring-2 focus:ring-blue-500 focus-visible:ring-2 focus:outline-none"
              aria-label="Submit"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>
        <section className="flex flex-col justify-start gap-3 w-full font-semibold text-xl">
          <Link href="https://www.bestpestkowe.pl">www.bezpestkowe.pl</Link>
          <Link href="mailto:bezpestkowe@gmail.com">bezpestkowe@gmail.com</Link>
          <Link href="https://www.instagram.com/bezpestkowe/">Instagram</Link>
          <Link href="https://www.facebook.com/groups/bezpestkowe/">
            Facebook
          </Link>
        </section>
        <section className="flex flex-col gap-4 w-full">
          <p className="pb-2 border-b-[1px] border-b-ewhite text-electric-500 text-sm">
            To pestka, to platforma, która powstała z inicjatywy Fundacji
            Bezpestkowe i stanowi jej własność.
          </p>
          <p className="text-sm">
            Fundacja Bezpestkowe <br />
            Niska 1E/61, 81-646 Gdynia <br />
            KRS - 0000951776 <br />
            NIP - 5862377596 <br />
            REGON - 521286817 <br />
          </p>
        </section>
        <section className="flex flex-col w-full text-xs">
          <Link href="">Regulamin</Link>
          <Link href="">Polityka Prywatności</Link>
          <Link href="">© 2024 Fundacja Bezpestkowe</Link>
        </section>
      </HomeSection>
    </>
  );
};

type AboutUsProps = {
  img: StaticImport;
  alt: string;
  h1: React.ReactNode;
  children: React.ReactNode;
};

const faqs = [
  ["Jak mogę zapłacić za kurs?", ""],
  ["Czy oferujecie faktury VAT?", ""],
  ["Studiuję, czy mogę liczyć na zniżkę?", ""],
  ["Nie jestem lekarzem, czy ten kurs jest dla mnie?", ""],
  ["Jak mogę wspierać osoby z zespołem MRKH?", ""],
  ["Co zawiera kurs i ile trwa?", ""],
  ["Kurs dotyczy zespołu MRKH. Czy znajdę w nim uniwersalne treści?", ""],
  ["Dlaczego to wy współprowadzicie kurs?", ""],
  ["Czy po ukończeniu kursu otrzymam certyfikat?", ""],
  ["Czy mogę w jakiś sposób wesprzeć działania fundacji?", ""],
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

const kursWLiczbach: Array<[string, React.ReactNode]> = [
  ["70", <span key="70">tyle minut trwa wideo<br /> zawarte w naszym kursie</span>],
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

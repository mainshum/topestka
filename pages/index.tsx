import type { NextPage } from "next";
import React from "react";
import Image from "next/image";
import bwPestki from "../public/images/bw-pestki.png";
import bwKapczuk from "../public/images/bw-kapczuk.png";

// sponsorzy
import ff from "../public/images/ff.png";
import kulawa from "../public/images/kulawa.png";
import tranzycja from "../public/images/tranzycja.png";
import skrzyneczka from "../public/images/skrzyneczka.png";
import kolektyw from "../public/images/kolektyw-chemia.png";
import mago from "../public/images/mago-vox.png";
import '../public/trailer.mp4';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/Accordion";
import { AccordionTrigger as RadixTrigger } from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils/misc";
import { Input } from "@/components/Input";
import Link from "next/link";
import clsx from "clsx";

// eslint-disable-next-line react/display-name
export const HomeSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"section">
>(({ children, className, ...rest }) => {
  return (
    <section
      {...rest}
      className={cn("px-6 md:px-32 pt-36 pb-20 min-h-svh", className)}
    >
      {children}
    </section>
  );
});

export const Intro = () => {
  return (
    <HomeSection className="flex flex-col justify-center items-center md:gap-5 px-6 pt-0">
      <h1 className="font-medium font-outfit text-6xl text-nowrap md:text-7xl">
        to pestka!
      </h1>
      <h2 className="pt-6 pb-14 md:pb-5 font-monarcha text-center text-xl lg:text-4xl">
        dowiedz się w jaki sposób przekazywać{" "}
        <br className="md:inline hidden"></br> informacje o zespole MRKH
      </h2>
      <section className="flex md:flex-row flex-col justify-center items-center gap-4">
        {/* todo use a button component */}
        <button className="text-xl btn btn-primary">Kup kurs</button>
        <a
          href="#program"
          className="border-electric-400 border text-xl btn btn-secondary"
        >
          Poznaj program
        </a>
      </section>
    </HomeSection>
  );
};

const SmLinebreak = () => <br className="lg:hidden" />;
const LgLinebreak = () => <br className="lg:inline hidden" />;

const Pitch = () => {
  return (
    <HomeSection
      id="program"
      className="flex flex-col justify-center items-start bg-eblue px- md:px-40 font-monarcha text-ewhite"
    >
      <h3 className="text-base text-electric-600 md:text-xl">
        Zdobywaj kompleksową wiedzę od pacjentek i ekspertek o zespole MRKH,{" "}
        <LgLinebreak /> by zapewniać najwyższy standard opieki.
      </h3>
      <h2 className="pt-6 pb-11 text-2xl md:text-5xl">
        Kurs pomoże Ci lepiej przekazywać diagnozę w sposób rzetelny,{" "}
        <SmLinebreak />
        wspierający i budujący poczucie bezpieczeństwa.
      </h2>
      <a href="#program-full" className="text-xl btn btn-secondary">
        Poznaj pełen program{" "}
      </a>
    </HomeSection>
  );
};

const OpisKursu = () => {
  return (
    <HomeSection className="flex flex-col justify-evenly items-center px-10 md:px-24">
      <h1 className="pb-20 font-monarcha text-4xl md:text-6xl">
        Nasz kurs dostarczy Ci kompleksowej wiedzy o <SmLinebreak /> zespole
        MRKH w pracy lekarza
      </h1>
      <section className="flex flex-col items-start gap-9">
        <p className="pl-3 border-l-[1.5px] border-l-eblue font-normal font-outfit text-electric-600 text-xl md:text-2xl">
          Program kursu pogłębia wiedzę o aspekty medyczne i psychologiczne
          związane z zespołem MRKH.
        </p>
        <p className="pl-3 border-l-[1.5px] border-l-eblue font-normal font-outfit text-electric-600 text-xl md:text-2xl">
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
      className="space-y-2 py-2 p-0 md:pb-5 border-b-[1.5px] border-b-ewhite font-monarcha text-xl md:text-3xl list-none"
      role="list"
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <ChevronRight
            className="flex-shrink-0"
            size={16}
            aria-hidden="true"
          />
          <span className="pl-4">{item}</span>
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
      <HomeSection className="flex justify-center items-center pt-0 pb-16 min-h-0">
        <video
          className="md:hidden"
          controls
          src="/_next/static/media/trailer.mp4"
          width="300"
        />
        <video
          className="md:block hidden rounded"
          controls
          src="/_next/static/media/trailer.mp4"
          width="960"
          height="540"
        />
      </HomeSection>
      <Pitch />
      <OpisKursu />
      <HomeSection className="flex flex-col justify-center bg-eblue px-10 md:pr-96 text-butter-100">
        <h1 className="pb-12 font-outfit text-4xl md:text-6xl">
          Dowiedz się jak kluczowe znaczenie ma:
        </h1>
        <section className="dowiedz-sie">
          <h2>
            Empatyczne <SmLinebreak />
            przekazywanie diagnozy
          </h2>
          <p>
            Dowiedz się, jak rzetelnie i z szacunkiem przekazać diagnozę zespołu
            MRKH. Kurs dostarcza wskazówek, jak prowadzić rozmowy w sposób
            wspierający, uwzględniając emocje pacjentki i budując z nią poczucie
            zaufania.
          </p>
        </section>
        <section className="dowiedz-sie">
          <h2>Wsparcie psychiczne i zrozumienie pacjentek</h2>
          <p>
            Kurs pozwala głębiej zrozumieć psychologiczne wyzwania i potrzeby
            pacjentek z zespołem MRKH. Dzięki wiedzy od osób z własnym
            doświadczeniem, nauczysz się, jak okazać prawdziwe wsparcie, które
            ułatwia pacjentkom proces akceptacji diagnozy.
          </p>
        </section>
      </HomeSection>
      <HomeSection
        id="program-full"
        className="px-6 md:!pr-42 pb-0 md:pl-24 text-eblue"
      >
        <h1 className="md:pb-16 font-medium font-outfit text-6xl md:text-7xl">
          Sprawdź nasz program!
        </h1>
        <p className="md:pb-24 font-monarcha text-xl md:text-3xl">
          Kurs zawiera elementy przeznaczone do oglądania, czytania oraz część
          interaktywną.
        </p>
        <section className="md:gap-x-12 md:grid md:grid-cols-2">
          {accordions.map(([title, content]) => (
            <Accordion key={title} type="single" collapsible>
              <AccordionItem value={title}>
                <AccordionTrigger
                  chevProps={{
                    className: "w-6 h-6 text-electric-600",
                  }}
                  className="pb-4 font-normal font-outfit text-xl md:text-4xl"
                >
                  <span className="before:content-['•'] before:pr-4 before:pl-2">
                    {title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pr-8 pl-10 font-light text-base md:text-2xl">
                  {content}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </section>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center items-center gap-20 md:grid grid-cols-[auto_50%] px-10 pt-40 pb-40 font-outfit text-eblue">
        <h1 className="font-medium text-6xl md:text-7xl">Dla kogo?</h1>
        <p className="md:order-3 md:font-light text-electric-600 text-xl md:text-2xl">
          Dla wszystkich osób chcących usprawnić komunikację w gabinetach
          lekarskich oraz chcących zgłębić swoją wiedzę na temat zespołu MRKH.
        </p>
        <Accordions
          items={[
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
          ]}
        />
      </HomeSection>
      <HomeSection className="flex flex-col justify-center gap-16 bg-eblue px-6 md:px-24 md:py-12 font-outfit text-butter-100">
        <h1 className="md:hidden font-medium font-monarcha text-4xl text-electric-500">
          Kurs w <br /> liczbach
        </h1>
        <section>
          {kursWLiczbach.map(([liczba, opis]) => (
            <div
              className="flex justify-between items-center gap-8 border-ewhite pt-3 pb-3 border-b-[1px]"
              key={liczba}
            >
              <span className="text-5xl md:text-7xl">{liczba}</span>
              <span className="text-right font-monarcha font-normal text-base md:text-3xl lg:text-4xl">
                {opis}
              </span>
            </div>
          ))}
        </section>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center pt-20 text-eblue">
        <h1 className="md:hidden pb-16 font-monarcha text-5xl">O nas</h1>
        <h1 className="md:inline hidden pb-24 font-monarcha text-5xl">
          Poznaj nas
        </h1>
        <AboutUsSection
          alt="Pestki"
          img={bwPestki}
          h1={
            <span>
              Fundacja <br /> Bezpestkowe
            </span>
          }
        >
          <Accordion
            className="md:order-3 md:font-light text-base md:text-xl"
            type="single"
            collapsible
          >
            <p>
              Bezpestkowe to projekt założony w 2018 roku, którego celem jest
              nie tylko aktywne wspieranie osób z zespołem
              Mayera-Rokitansky’ego-Küstera-Hausera, ale również uświadamianie i
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
        </AboutUsSection>
        <AboutUsSection
          alt="Dr Kapczuk"
          img={bwKapczuk}
          h1="dr hab. n. med.  Karina Kapczuk"
        >
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
        </AboutUsSection>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center gap-12 md:grid grid-cols-[45%_55%] px-6 md:px-20">
        <section className="md:grid-rows-subgrid">
          <OfferingSection>
            <h1 className="font-monarcha text-3xl text-center md:text-5xl">
              MRKH to pestka!
            </h1>
            <Cena
              cena={<span className="pl-2 font-monarcha">cena</span>}
              koszt="299"
            />
            <Cena
              cena={
                <span className="bg-electric-600 px-2 py-1 rounded-md w-fit font-monarcha">
                  cena do końca lutego
                </span>
              }
              koszt="200"
            />
            <button className="py-4 text-xl/none btn btn-secondary self-center">
              Kup kurs
            </button>
          </OfferingSection>
          <section className="flex md:px-10 md:py-16">
            <p className="font-medium text-xl">
              Dołącz do naszego newslettera aby nie przegapić oferty!
            </p>
            <button className="px-10 py-4 text-lg text-nowrap btn btn-primary">Zapisz się</button>
          </section>
        </section>
        <OfferingSection className="gap-3 md:px-10">
          <h1 className="pb-4 border-b-[1.5px] border-b-ewhite font-outfit text-3xl md:text-5xl">
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
          <a
            href="#program"
            className="border-2 border-orange-400 mt-4 py-4 text-xl md:text-4xl btn btn-primary self-center"
          >
            Poznaj program
          </a>
        </OfferingSection>
      </HomeSection>
      <HomeSection className="flex flex-col gap-2 bg-eblue px-4 text-ewhite">
        <h1 className="pb-10 text-3xl">F.A.Q</h1>
        <section className={clsx('accordions')}>
          {faqs.map(([question, answer]) => (
            <Accordion orientation="horizontal" key={question} type="single" collapsible>
              <AccordionItem className="md:gap-10 md:grid grid-cols-2"  value={question}>
                <AccordionTrigger
                  chevProps={{
                    className: "text-ewhite shrink-0 transform -rotate-90 ",
                  }}
                  className="border-ewhite border-b-[1px] border-solid [&[data-state=open]>svg]:rotate-90 font-outfit text-base md:text-xl"
                >
                  {question}
                </AccordionTrigger>
                <AccordionContent className="md:text-xl" >{answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </section>
      </HomeSection>
      <HomeSection className="flex flex-col justify-center items-center gap-8 px-8 text-eblue">
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
      <HomeSection id="kontakt" className="flex flex-col justify-center items-center gap-20 bg-eblue pt-20 pb-5 text-ewhite">
        <section className="flex flex-col items-center gap-4 w-full">
          <h1 className="font-monarcha text-2xl/tight">
            Dołącz do naszego newslettera:
          </h1>
          <div className="flex w-full">
            <Input
              className="border-x-0 pl-0 border-t-0 border-b-[1px] border-b-ewhite rounded-none text-electric-500 text-lg placeholder:text-electric-500"
              type="email"
              placeholder="Twój email"
            />
            <button
              type="submit"
              className="px-2 rounded-full focus:ring-2 focus:ring-blue-500 focus-visible:ring-2 focus:outline-none"
              aria-label="Submit"
            >
              <ChevronRight className="w-6 h-6" />
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
          <p className="opacity-70 pb-2 border-b-[1px] border-b-ewhite text-base text-electric-500">
            To pestka, to platforma, która powstała z inicjatywy Fundacji
            Bezpestkowe i stanowi jej własność.
          </p>
          <p className="font-monarcha text-lg">
            Fundacja Bezpestkowe <br />
            Niska 1E/61, 81-646 Gdynia <br />
            KRS - 0000951776 <br />
            NIP - 5862377596 <br />
            REGON - 521286817 <br />
          </p>
        </section>
        <section className="flex flex-col w-full text-base">
          <Link href="/regulamin">Regulamin</Link>
          <Link href="/polityka-prywatnosci">Polityka Prywatności</Link>
          <Link href="">© 2024 Fundacja Bezpestkowe</Link>
        </section>
      </HomeSection>
    </>
  );
};

const faqs: [string, React.ReactNode][] = [
  [
    "Jak mogę zapłacić za kurs?",
    <>
      <span>Możesz wybrać jedną z poniższych metod płatności:</span>
      <ul className="pl-4 list-disc">
        <li>Szybki przelewzonline za pośrednictwem Przelewy24.</li>
        <li>Tradycyjny przelew bankowy na konto fundacji.</li>
        <li>Rozłożenie płatności na raty za pomocą usługi PayPo.</li>
      </ul>
    </>,
  ],
  [
    "Czy oferujecie faktury VAT?",
    <>
      Tak, wystawiamy faktury i rachunki! Podczas dokonywania płatności zaznacz
      odpowiednią opcję i wypełnij wymagane dane. Faktura/rachunek zostanie
      wysłana do Ciebie w ciągu 2-3 dni roboczych od zakupu.
    </>,
  ],
  [
    "Studiuję, czy mogę liczyć na zniżkę?",
    <>
      Tak, oferujemy zniżki dla studentów! Skontaktuj się z nami, a znajdziemy
      najlepsze rozwiązanie. Napisz na adres bezpestkowe@gmail.com, aby
      dowiedzieć się więcej.
    </>,
  ],
  [
    "Nie jestem lekarzem, czy ten kurs jest dla mnie?",
    <>
      Tak, kurs jest odpowiedni również dla osób, które chcą poszerzyć swoją
      wiedzę na temat zespołu MRKH. Jeśli pracujesz z osobami z zespołem MRKH
      jako osoba specjalistyczna, ktoś z Twojego bliskiego otoczenia ma ten
      zespół, lub po prostu chcesz dowiedzieć się więcej na ten temat - kurs
      będzie dla Ciebie odpowiedni. Porusza on także zagadnienia społeczne
      związane z MRKH.
    </>,
  ],
  [
    "Jak mogę wspierać osoby z zespołem MRKH?",
    <>
      Kurs składa się z ponad godzinnego wykładu, który obejmuje zarówno
      perspektywę pacjencką, jak i lekarską. Dodatkowo, uczestnicy kursu
      otrzymują dostęp do wszystkich materiałów edukacyjnych, w tym notatek oraz
      quizów, które pozwalają sprawdzić zdobytą wiedzę. Kurs możesz realizować
      we własnym własnym tempie, wracając do poszczególnych materiałów w
      dowolnym czasie.
    </>,
  ],
  [
    "Co zawiera kurs i ile trwa?",
    <>
      Kurs składa się z ponad godzinnego wykładu, który obejmuje zarówno
      perspektywę pacjencką, jak i lekarską. Dodatkowo, uczestnicy kursu
      otrzymują dostęp do wszystkich materiałów edukacyjnych, w tym notatek oraz
      quizów, które pozwalają sprawdzić zdobytą wiedzę. Kurs możesz realizować
      we własnym własnym tempie, wracając do poszczególnych materiałów w
      dowolnym czasie.
    </>,
  ],
  [
    "Kurs dotyczy zespołu MRKH. Czy znajdę w nim uniwersalne treści?",
    <>
      Tak! Choć kurs skupia się na nauce prawidłowego sposobu przekazywania
      diagnozy o zespole MRKH, to ma w sobie także szereg uniwersalnych treści.
      Nasze materiały pomogą Ci zrozumieć perspektywę pacjentek i pacjentek na
      temat prowadzenia rozmowy w gabinecie medycznym. Ponadto w kursie
      poruszamy uniwersalne kwestie związane z zespołem MRKH, które dotyczą
      także innych osób m. in. brak menstruacji, ulokowanie poczucia kobiecości,
      alternatywne metody macierzyństwa.
    </>,
  ],
  [
    "Dlaczego to wy współprowadzicie kurs?",
    <>
      Ponieważ posiadamy wieloletnie doświadczenie w prowadzaniu wykładów,
      warsztatów oraz badań, a od ponad sześciu lat tworzymy największą w Polsce
      społeczność oraz bazę wiedzy na temat zespołu MRKH.
    </>,
  ],
  [
    "Czy po ukończeniu kursu otrzymam certyfikat?",
    <>
      Tak, po ukończeniu kursu otrzymasz certyfikat ukończenia, który będzie
      stanowił potwierdzenie Twojej wiedzy, że zespół MRKH to dla Ciebie pestka!
    </>,
  ],
  [
    "Czy mogę w jakiś sposób wesprzeć działania fundacji?",
    <>
      Tak, możesz wspierać nas na różne sposoby: Śledząc nasze materiały
      edukacyjne w mediach społecznościowych i na naszej stronie internetowej.
      Dokonując darowizny na konto fundacji. Stawiając kawę fundacji poprzez
      platformę Buy Coffee.
    </>,
  ],
];

const AboutUsSection = ({ img, children, h1, alt }: any) => (
  <section className="flex flex-col gap-8 md:grid md:grid-cols-2 pb-20 md:pb-28 font-outfit">
    <h1 className="md:order-2 pb-3 border-b-[1.5px] border-b-electric-400 text-3xl md:text-4xl">
      {h1}
    </h1>
    <Image
      src={img}
      loading="lazy"
      alt={alt}
      className="md:order-1 row-span-2"
    />
    {children}
  </section>
);

export default Home;

const kursWLiczbach: Array<[string, React.ReactNode]> = [
  [
    "70",
    <span key="70">
      tyle minut trwa wideo
      <br /> zawarte w naszym kursie
    </span>,
  ],
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

function Cena({ cena, koszt }: { cena: React.ReactNode; koszt: string }) {
  return (
    <div className="flex flex-col flex-grow-2 gap-4 pb-4 pl-2 border-b-[1.5px] border-b-butter-100">
      {cena}
      <div>
        <span className="pr-2 font-outfit text-3xl md:text-4xl">{koszt}</span>
        <span className="font-outfit text-xl">(PLN brutto)</span>
      </div>
    </div>
  );
}

function Accordions({ items }: { items: string[][] }) {
  return (
    <section className="flex flex-col gap-4 row-span-2 w-full accordions">
      {items.map(([key, val]) => (
        <Accordion key={key} type="single" collapsible>
          <AccordionItem
            className="border-eblue md:pb-4 border-b text-xl"
            value={key}
          >
            <AccordionTrigger
              chevProps={{ className: "w-6 h-6 text-eblue" }}
              className="font-monarcha font-normal text-xl md:text-4xl"
            >
              {key}
            </AccordionTrigger>
                <AccordionContent className="pr-8 font-light text-base md:text-2xl">
              {val}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </section>
  );
}

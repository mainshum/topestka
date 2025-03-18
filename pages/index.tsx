import type { NextPage } from "next";
import React from "react";
import "../public/trailer.mp4";

// Components
import { Intro } from "@/components/Intro";
import Pitch from "@/components/Pitch";
import OpisKursu from "@/components/OpisKursu";
import DowiedzSie from "@/components/DowiedzSie";
import ProgramFull, { AccordionItemData } from "@/components/ProgramFull";
import DlaKogo, { AccordionItemData as DlaKogoItemData } from "@/components/DlaKogo";
import KursWLiczbach, { KursWLiczbachItem } from "@/components/KursWLiczbach";
import AboutUs from "@/components/AboutUs";
import KupKursSection from "@/components/KupKursSection";
import FAQ, { FAQItem } from "@/components/FAQ";
import Sponsors from "@/components/Sponsors";
import Newsletter from "@/components/Newsletter";

// Images
import bwPestki from "../public/images/bw-pestki.png";
import bwKapczuk from "../public/images/bw-kapczuk.png";
import ff from "../public/images/ff.png";
import kulawa from "../public/images/kulawa.png";
import tranzycja from "../public/images/tranzycja.png";
import skrzyneczka from "../public/images/skrzyneczka.png";
import kolektyw from "../public/images/kolektyw-chemia.png";
import mago from "../public/images/mago-vox.png";

// Accordion Components
import { Accordion, AccordionItem, AccordionContent } from "@/components/Accordion";
import { AccordionTrigger as RadixTrigger } from "@radix-ui/react-accordion";

const Home: NextPage = () => {
  return (
    <>
      <Intro />
      <Pitch />
      <OpisKursu />
      <DowiedzSie />
      <ProgramFull accordions={accordions} />
      <DlaKogo items={dlaKogoItems} />
      <KursWLiczbach items={kursWLiczbachItems} />
      <AboutUs sections={aboutUsSections} />
      <KupKursSection />
      <FAQ faqs={faqItems} />
      <Sponsors sponsors={sponsorItems} />
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
          Mayera-Rokitansky&apos;ego-Küstera-Hausera, ale również uświadamianie i
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

const sponsorItems = [
  { src: ff, alt: "Fundacja Feminoteka" },
  { src: kulawa, alt: "Kulawa Warszawa" },
  { src: tranzycja, alt: "Tranzycja" },
  { src: skrzyneczka, alt: "Skrzyneczka" },
  { src: kolektyw, alt: "Kolektyw Chemia" },
  { src: mago, alt: "Mago Vox" },
];

const faqItems: FAQItem[] = [
  [
    "Jak mogę zapłacić za kurs?",
    <>
      <span>Możesz wybrać jedną z poniższych metod płatności:</span>
      <ul className="pl-4 list-disc">
        <li>Szybki przelewzonline za pośrednictwem Przelewy24.</li>
        <li>Tradycyjny przelew bankowy na konto fundacji.</li>
        <li>Rozłożenie płatności na raty za pomocą usługi PayPo.</li>
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
      najlepsze rozwiązanie. Napisz na adres bezpestkowe@gmail.com, aby
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
      edukacyjne w mediach społecznościowych i na naszej stronie internetowej.
      Dokonując darowizny na konto fundacji. Stawiając kawę fundacji poprzez
      platformę Buy Coffee.
    </>,
  ],
];
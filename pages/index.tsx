import type { NextPage } from "next";
import clsx from "clsx";
import React from "react";
import Image from "next/image";
import kapczuk from "../public/images/kapczuk.jpeg";
import pestki from "../public/images/dziewczyny.jpeg";

// eslint-disable-next-line react/display-name
const HomeSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"section">
>(({ children, className }) => {
  return (
    <section className={clsx("min-h-screen", "ps-36", "pe-36", className)}>
      {children}
    </section>
  );
});

const Zuzka = () => {
  return <HomeSection>VIDEO</HomeSection>;
};

const PoznajNas = () => {
  return (
    <HomeSection className="flex flex-col gap-28 pt-24 pb-24">
      <h1 className="text-6xl pb-24 monarcha-60">Poznaj nas!</h1>
      <section className="flex gap-28 items-center justify-start">
        {/* todo is it bad to have explicit width and height? */}
        <Image className="rounded" width={400} src={pestki} alt="Dziewczyny" />
        <div className="whitespace-break-spaces">
          <h2 className="outfit-44 pb-4 border-b border-b-electricOrange">
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
      <section className="flex gap-28 items-center justify-start">
        {/* todo is it bad to have explicit width and height? */}
        <Image className="rounded" width={400} src={kapczuk} alt="Dziewczyny" />
        <div className="whitespace-break-spaces">
          <h2 className="outfit-44 pb-4 border-b border-b-electricOrange">
            dr hab. n. med.
            <br />
            Karina Kapczuk
          </h2>
          <p className="pt-14 pb-16 outfit-22">
            Lekarz, specjalista ginekolog-położnik,<br />endokrynolog oraz ginekolog
            wieku<br></br>rozwojowego (IFEPAG I i II). Pracuje w Klinice<br></br>Ginekologii
            Uniwersytetu Medycznego (UM) im.<br></br>K. Marcinkowskiego w Poznaniu w
            Ginekologiczno-<br/>Położniczym Szpitalu Klinicznym UM w Poznaniu.
          </p>
          <button className="btn btn-primary">Czytaj dalej</button>
        </div>
      </section>
    </HomeSection>
  );
};

const Pitch = () => {
  return (
    <HomeSection className="bg-eblue flex flex-col justify-center items-start text-ewhite">
      <h3>
        Zdobywaj kompleksową wiedzę od pacjentek i ekspertek o zespole MRKH,
        <br />
        by zapewniać najwyższy standard opieki.
      </h3>
      <h2 className="pt-6 pb-11 font-monarcha-bold">
        Kurs pomoże Ci lepiej przekazywać diagnozę w sposób rzetelny,
        wspierający i budujący poczucie bezpieczeństwa.
      </h2>
      <button className="btn btn-secondary ps-14 pe-14">
        Poznaj pełen program{" "}
      </button>
    </HomeSection>
  );
};

const Intro = () => {
  return (
    <HomeSection>
      <h3>2 akademickie godziny o komunikacji medycznej</h3>
      <h1>MRKH to pestka!</h1>
      <h2>
        dowiedz się w jaki sposób przekazywać <br /> informacje o zespole MRKH
      </h2>
      <section className="flex space-x-3 pt-8">
        <button className="btn btn-primary">Kup kurs</button>
        <button className="btn btn-secondary">Poznaj program</button>
      </section>
    </HomeSection>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Intro />
      <Zuzka />
      <Pitch />
      <PoznajNas />
    </>
  );
};
export default Home;

import type { NextPage } from "next";
import clsx from "clsx";
import React from "react";
import Image from "next/image";
import kapczuk from "../public/images/kapczuk.jpeg";
import pestki from "../public/images/dziewczyny.jpeg";

// eslint-disable-next-line react/display-name
export const HomeSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"section">
>(({ children, className }) => {
  return (
    <section className={clsx("min-h-svh", className)}>
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
    <HomeSection className="flex flex-col justify-center items-start bg-eblue text-ewhite">
      <h3>
        Zdobywaj kompleksową wiedzę od pacjentek i ekspertek o zespole MRKH,
        <br />
        by zapewniać najwyższy standard opieki.
      </h3>
      <h2 className="pt-6 pb-11 font-monarcha-bold">
        Kurs pomoże Ci lepiej przekazywać diagnozę w sposób rzetelny,
        wspierający i budujący poczucie bezpieczeństwa.
      </h2>
      <button className="btn btn-secondary pe-14 ps-14">
        Poznaj pełen program{" "}
      </button>
    </HomeSection>
  );
};


export const Intro = () => {
  return (
    <HomeSection className="flex flex-col justify-center items-center h-svh">
      <h1 className="font-medium text-nowrap outfit-82 sm:outfit-128">to pestka!</h1>
      <h2 className="pt-3 pb-10 sm:pb-14 lg:pb-5 text-center lg:monarcha-42 monarcha-22">
        dowiedz się w jaki sposób przekazywać informacje o zespole MRKH
      </h2>
      <section className="flex lg:flex-row flex-col items-center gap-4 space-x-3">
        {/* todo use a button component */}
        <button className="btn btn-primary outfit-22">Kup kurs</button>
        <button className="border-orange-300 border btn btn-secondary outfit-22">
          Poznaj program
        </button>
      </section>
    </HomeSection>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Intro />
      <PromoVideo />
      <Pitch />
      <PoznajNas />
    </>
  );
};
export default Home;

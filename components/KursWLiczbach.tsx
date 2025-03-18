import React from "react";
import HomeSection from "./HomeSection";

export type KursWLiczbachItem = [string, React.ReactNode];

const KursWLiczbach = ({ items }: { items: KursWLiczbachItem[] }) => {
  return (
    <HomeSection className="flex flex-col justify-center gap-16 bg-eblue px-6 md:px-24 md:py-12 font-outfit text-butter-100">
      <h1 className="md:hidden font-medium font-monarcha text-4xl text-electric-500">
        Kurs w <br /> liczbach
      </h1>
      <section>
        {items.map(([liczba, opis]) => (
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
  );
};

export default KursWLiczbach;
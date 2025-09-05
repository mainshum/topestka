import React from "react";
import HomeSection from "./HomeSection";

export type KursWLiczbachItem = [string, React.ReactNode];

const KursWLiczbach = ({ items }: { items: KursWLiczbachItem[] }) => {
  return (
    <HomeSection decreaseSize className="flex flex-col justify-start md:justify-between items-start md:gap-4 gap-0 bg-eblue py-28 px-8 md:px-6 md:px-24 md:py-12 font-outfit text-butter-100">
      <h1 className="md:hidden font-medium font-monarcha text-4xl text-electric-500 pb-12 md:pb-4 ">
        Kurs w <br /> liczbach
      </h1>
      <>
        {items.map(([liczba, opis]) => (
          <div
            className="flex justify-between w-full items-center gap-8 md:pb-8 border-ewhite border-b-[1px]"
            key={liczba}
          >
            <span className="text-5xl md:text-7xl">{liczba}</span>
            <span className="text-right font-monarcha font-normal text-base md:text-3xl lg:text-4xl">
              {opis}
            </span>
          </div>
        ))}
      </>
    </HomeSection>
  );
};

export default KursWLiczbach;

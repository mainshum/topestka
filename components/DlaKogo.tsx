import React from "react";
import HomeSection from "./HomeSection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

export type AccordionItemData = [string, React.ReactNode];

const Accordions = ({ items }: { items: AccordionItemData[] }) => {
  return (
    <section className="flex flex-col justify-between h-full row-span-2 w-full accordions">
      {items.map(([key, val]) => (
        <Accordion key={key} type="single" collapsible>
          <AccordionItem
            className="border-eblue xl:pb-4 xl:pt-8 border-b text-xl"
            value={key}
          >
            <AccordionTrigger
              chevProps={{ className: "w-6 h-6 text-eblue" }}
              className="font-monarcha font-normal text-xl md:text-4xl"
            >
              {key}
            </AccordionTrigger>
            <AccordionContent className="pr-8 font-extralight pt-2 xl:pt-8 text-base md:text-3xl">
              {val}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </section>
  );
};

const DlaKogo = ({ items }: { items: AccordionItemData[] }) => {
  return (
    <HomeSection className="justify-between items-center grid gap-x-12 grid-cols-1 xl:grid-cols-[40%_60%] px-8 md:px-40 py-24 md:py-40 font-outfit text-eblue">
      <div className="flex flex-col xl:gap-20 h-full">
        <h1 className="font-medium text-6xl md:text-7xl">Dla kogo?</h1>
        <p className="md:order-3 max-lg:pt-12 md:font-light text-electric-600 text-xl md:text-2xl">
          Dla wszystkich osób chcących usprawnić komunikację w gabinetach
          lekarskich oraz chcących zgłębić swoją wiedzę na temat zespołu MRKH.
        </p>
      </div>
      <Accordions items={items} />
    </HomeSection>
  );
};

export default DlaKogo;

import React from "react";
import HomeSection from "./HomeSection";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

export type AccordionItemData = [string, React.ReactNode];

const Accordions = ({ items }: { items: AccordionItemData[] }) => {
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
};

const DlaKogo = ({ items }: { items: AccordionItemData[] }) => {
  return (
    <HomeSection className="flex flex-col justify-center items-center gap-20 md:grid grid-cols-[auto_50%] px-10 pt-40 pb-40 font-outfit text-eblue">
      <h1 className="font-medium text-6xl md:text-7xl">Dla kogo?</h1>
      <p className="md:order-3 md:font-light text-electric-600 text-xl md:text-2xl">
        Dla wszystkich osób chcących usprawnić komunikację w gabinetach
        lekarskich oraz chcących zgłębić swoją wiedzę na temat zespołu MRKH.
      </p>
      <Accordions items={items} />
    </HomeSection>
  );
};

export default DlaKogo;
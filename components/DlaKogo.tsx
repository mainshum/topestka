import React from "react";
import HomeSection from "./HomeSection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";
import { Content } from "@radix-ui/react-accordion";
import { LgLinebreak } from "./LineBreaks";
import { AccContent } from "./AccContent";

export type AccordionItemData = [string, React.ReactNode];

const Accordions = ({ items }: { items: AccordionItemData[] }) => {
  return (
        <Accordion className="flex flex-col gap-y-10 h-full row-span-2 w-full accordions" type="single" collapsible>
      {items.map(([key, val], index) => (
          <AccordionItem
            key={index}
            className="border-eblue border-b"
            value={key}
          >
            <AccordionTrigger
              chevProps={{ className: "w-6 h-6 text-eblue" }}
              className="font-monarcha font-normal text-xl md:text-4xl pb-8"
            >
              {key}
            </AccordionTrigger>
            <AccContent className="pr-8 font-extralight text-lg md:text-3xl">
              <span>{val}</span>
              <LgLinebreak />
              <LgLinebreak />
            </AccContent>
          </AccordionItem>
      ))}
        </Accordion>
  );
};

const DlaKogo = ({ items }: { items: AccordionItemData[] }) => {
  return (
    <HomeSection className="justify-between items-center grid gap-x-12 grid-cols-1 xl:grid-cols-[40%_60%] px-8 md:px-40 py-24 md:py-40 font-outfit text-eblue">
      <div className="flex flex-col xl:gap-20 h-full">
        <h1 className="font-medium text-6xl md:text-7xl">Dla kogo?</h1>
        <p className="md:order-3 max-xl:py-12 md:font-light text-electric-600 text-xl md:text-2xl">Dla osób chcących poznać perspektywę pacjencką oraz zglębić swoją wiedzę na temat zespołu MRKH.</p>
      </div>
      <Accordions items={items} />
    </HomeSection>
  );
};

export default DlaKogo;

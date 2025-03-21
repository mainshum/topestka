import React from "react";
import HomeSection from "./HomeSection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

export type AccordionItemData = [string, React.ReactNode];

const ProgramFull = ({ accordions }: { accordions: AccordionItemData[] }) => {
  return (
    <HomeSection
      id="program-full"
      className="px-20 md:px-40 md:py-24 text-eblue"
    >
      <h1 className="md:pb-16 font-medium font-outfit text-6xl md:text-7xl">
        Sprawdź nasz program!
      </h1>
      <p className="pl-1 relative left-1 border-l border-l-eblue-500 font-monarcha text-electric-600 text-xl md:text-3xl">
        Kurs zawiera elementy przeznaczone do oglądania, czytania oraz część
        interaktywną.
      </p>
      <section className="md:gap-x-6 md:gap-y-4 md:grid md:grid-cols-2 pt-24">
        {accordions.map(([title, content]) => (
          <Accordion key={title} type="single" collapsible>
            <AccordionItem value={title}>
              <AccordionTrigger
                chevProps={{
                  className: "w-6 h-6 text-eblue-600",
                }}
                className="pb-4 px-4 border-b border-b-eblue-300 font-normal text-eblue-600 font-outfit text-xl md:text-4xl transition rounded transition-discrete data-[state=open]:bg-[#2A4BCC] data-[state=open]:opacity-85 data-[state=open]:text-butter-100"
              >
                {title}
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 font-light text-base md:text-3xl ">
                {content}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </section>
    </HomeSection>
  );
};

export default ProgramFull;

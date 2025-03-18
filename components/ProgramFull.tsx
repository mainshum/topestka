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
  );
};

export default ProgramFull;
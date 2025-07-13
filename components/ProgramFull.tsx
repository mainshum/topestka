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
      className="lg:px-40 gap-10 flex flex-col items-start lg:block py-16 lg:py-24 text-eblue"
    >
      <h1 className="lg:pb-16 font-medium font-outfit text-6xl lg:text-7xl">
        Sprawdź nasz program!
      </h1>
      <p className="pl-1 relative border-l-blue-500 border-l-[1px] font-monarcha text-electric-600 text-xl lg:text-3xl">
        Kurs zawiera elementy przeznaczone do oglądania, czytania oraz część
        interaktywną.
      </p>
      <section className="lg:gap-x-6 lg:gap-y-4 grid grid-cols-1 min-[1320px]:grid-cols-2 lg:pt-24 w-full">
        {accordions.map(([title, content]) => (
          <Accordion key={title} type="single" collapsible>
            <AccordionItem value={title}>
              <AccordionTrigger
                chevProps={{
                  className: "w-6 h-6 text-eblue-600 ",
                }}
                className="px-4 border-b border-b-eblue-300 pt-4 pb-3  text-eblue-600 font-outfit  text-xl lg:text-4xl transition max-md:duration-500 data-[state=open]:rounded-md transition-discrete data-[state=open]:bg-[rgb(42,75,204)]/85  data-[state=open]:text-butter-100 [&>svg]:data-[state=open]:text-butter-100"
              >
                {title}
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-0 border-b border-b-eblue-300 lg:px-4 py-2 lg:pt-4 font-extralight font-outfit text-xl/[1.1] lg:text-3xl ">
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

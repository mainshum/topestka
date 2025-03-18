import React from "react";
import clsx from "clsx";
import HomeSection from "./HomeSection";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

export type FAQItem = [string, React.ReactNode];

type FAQProps = {
  faqs: FAQItem[];
};

const FAQ = ({ faqs }: FAQProps) => {
  return (
    <HomeSection className="flex flex-col gap-2 bg-eblue px-4 text-ewhite">
      <h1 className="pb-10 text-3xl">F.A.Q</h1>
      <section className={clsx("accordions")}>
        {faqs.map(([question, answer]) => (
          <Accordion
            orientation="horizontal"
            key={question}
            type="single"
            collapsible
          >
            <AccordionItem
              className="md:gap-10 md:grid grid-cols-2"
              value={question}
            >
              <AccordionTrigger
                chevProps={{
                  className: "text-ewhite shrink-0 transform -rotate-90 ",
                }}
                className="border-ewhite border-b-[1px] border-solid [&[data-state=open]>svg]:rotate-90 font-outfit text-base md:text-xl"
              >
                {question}
              </AccordionTrigger>
              <AccordionContent className="md:text-xl">
                {answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </section>
    </HomeSection>
  );
};

export default FAQ;
import React from "react";
import HomeSection from "./HomeSection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";
import { AccContent } from "./AccContent";

export type AccordionItemData = [string, React.ReactNode];

const Acc = ({ title, content }: { title: string, content: string }) => {
  return (
    <AccordionItem className="overflow-hidden" value={title}>
      <AccordionTrigger
        chevProps={{
          className: "w-6 h-6 text-eblue-600 ",
        }}
        className="px-4 py-6 border-b border-b-eblue-300  text-eblue-600 font-outfit  text-xl lg:text-4xl transition max-md:duration-500 data-[state=open]:rounded-md transition-discrete data-[state=open]:bg-[rgb(42,75,204)]/85  data-[state=open]:text-butter-100 [&>svg]:data-[state=open]:text-butter-100 "
      >
        {title}
      </AccordionTrigger>
      <AccContent className="px-2 pb-0 border-b border-b-eblue-300 lg:px-4 font-light font-outfit text-xl/[1.1] lg:text-[32px]/[1.1]">
        <div className="h-3" />
        {content}
        <div className="h-4" />
      </AccContent>
    </AccordionItem>
  )
}

const ProgramFull = () => {
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
      <Accordion type="single" collapsible className="lg:gap-x-6 grid grid-cols-1 min-[1320px]:grid-cols-2 lg:pt-24 w-full">
        <section className="flex flex-col">
          <Acc title="dwuczęściowe wideo" content="dzięki któremu poznasz perspektywę pacjencką i ekspercką na temat komunikacji w gabinecie medycznym" />
          <Acc title="zestaw fiszek" content="stworzonych przez dr Karinę Kapczuk w celu przeprowadzenia wspierającej rozmowy z rodzicami osób z zespołem MRKH" />
          <Acc title="dwie broszury" content="stworzone przez Fundację Bezpestkowe na temat zespołu MRKH oraz towarzyszących mu kwestiach" />
        </section>
        <section className="flex flex-col">
          <Acc title="publikację" content="która stanowi podsumowanie badań przeprowadzonych przez Agatą Śmiałkowską na temat przygotowania osób studiujących kierunek lekarski do rozmów z pacjentami" />
          <Acc title="quiz" content="mający na celu sprawdzenie twojej wiedzy z kursu" />
          <Acc title="certyfikat" content="potwierdzający, że MRKH to dla ciebie pestka! " />
        </section>
      </Accordion>
    </HomeSection>
  );
};

export default ProgramFull;

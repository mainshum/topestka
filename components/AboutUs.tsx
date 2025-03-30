import React from "react";
import Image from "next/image";
import HomeSection from "./HomeSection";
import { Accordion, AccordionItem, AccordionContent } from "./Accordion";
import { AccordionTrigger as RadixTrigger } from "@radix-ui/react-accordion";

type AboutUsSectionProps = {
  img: any;
  children: React.ReactNode;
  h1: React.ReactNode;
  alt: string;
};

const AboutUsSection = ({ img, children, h1, alt }: AboutUsSectionProps) => (
  <section className="flex flex-col gap-8 md:grid md:grid-cols-2 pb-20 md:pb-28 font-outfit">
    <h1 className="md:order-2 pb-3 border-b-[1.5px] border-b-electric-400 text-3xl md:text-4xl">
      {h1}
    </h1>
    <Image
      src={img}
      loading="lazy"
      alt={alt}
      className="md:order-1 row-span-2"
    />
    {children}
  </section>
);

const AboutUs = ({ sections }: { sections: AboutUsSectionProps[] }) => {
  return (
    <HomeSection
      id="o-nas"
      className="flex flex-col justify-center pt-20 text-eblue"
    >
      <h1 className="md:hidden pb-16 font-monarcha text-5xl">O nas</h1>
      <h1 className="hidden md:inline pb-24 font-monarcha text-5xl">
        Poznaj nas
      </h1>
      {sections.map((section, index) => (
        <AboutUsSection key={index} {...section} />
      ))}
    </HomeSection>
  );
};

export default AboutUs;
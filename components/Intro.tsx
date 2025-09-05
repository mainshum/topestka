import React from "react";
import Link from "next/link";
import { buttonVariants } from "./Button";
import HomeSection from "./HomeSection";
import { cn } from "@/utils/misc";

const Intro = () => {
  return (
    <HomeSection className="flex flex-col justify-center md:justify-start items-center gap-8 md:gap-0 px-6 md:pt-72">
      <h1 className="font-medium font-outfit  text-6xl text-nowrap md:text-7xl">
        to pestka!
      </h1>
      <h2 className="md:pt-6 md:pb-14 font-monarcha text-electric-600 text-center text-xl lg:text-4xl">
        dowiedz się w jaki sposób przekazywać{" "}
        <br className="md:inline hidden"></br> informacje o zespole MRKH
      </h2>
      <section className="flex md:flex-row flex-col justify-center items-center gap-4">
        <Link className={cn(buttonVariants({ variant: "kupkurs", size: "lg" }))} href="#kup-kurs" >
          Kup kurs
        </Link>
        <Link
          className={cn(buttonVariants({ variant: "program", size: "lg" }))}
          href="#program"
        >
          Poznaj program
        </Link>
      </section>
    </HomeSection>
  );
};

export { Intro };

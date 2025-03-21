import React from "react";
import Link from "next/link";
import { buttonVariants } from "./Button";
import HomeSection from "./HomeSection";

const KupKurs = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement>
>(({ className }) => {
  return (
    <Link
      className={`${buttonVariants({ variant: "kupkurs" })} flex items-center`}
      href="https://actionnetwork.org/forms/mrkh-to-pestka"
    >
      Kup kurs
    </Link>
  );
});

KupKurs.displayName = "KupKurs";

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
        <KupKurs className="text-xl btn btn-primary" />
        <Link
          className={`${buttonVariants({ variant: "program" })} flex items-center`}
          href="#program"
        >
          Poznaj program
        </Link>
      </section>
    </HomeSection>
  );
};

export { Intro, KupKurs };

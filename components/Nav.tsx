"use client";

import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Justify from "./icons";
import { HTMLAttributes, PropsWithoutRef, useEffect, useState } from "react";
import { cn } from "@/utils/misc";
import React from "react";
import { Accordion, AccordionItem } from "./Accordion";
import {
  AccordionTrigger as RadixTrigger,
  Content,
} from "@radix-ui/react-accordion";

type DesktopProps = PropsWithoutRef<HTMLDivElement> & {
  session: any;
  useStaticNav: boolean;
};

import clsx from "clsx";
import { buttonVariants } from "./Button";

const HEADER_H = 106;
const STATIC_WHEN_FROM_TOP = 500;
const SCROLL = 1;

const resetScroll = (pos: number) => ({
  scrollDownStart: pos,
  currentScrollDown: pos,
});

const TopLinks = React.forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLUListElement>
>(({ className }) => {
  return (
    <ul
      className={clsx(
        "text-eblue gap-12 flex justify-center items-center",
        className,
      )}
    >
      <li>
        <Link href="#program"> Program </Link>
      </li>
      <li>
        <Link href="#o-nas">O prowadzących</Link>
      </li>
      <li>
        <Link href="#kup-kurs"> Kup kurs </Link>
      </li>
      <li>
        <Link href="#kontakt"> Kontakt </Link>
      </li>
    </ul>
  );
});

TopLinks.displayName = "TopLinks";

const Root = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }) => {
    return (
      <nav
        className={clsx(
          "lg:flex justify-between items-center p-10 py-8 border border-b-eblue-100 font-medium",
          className,
        )}
        {...props}
      >
        {children}
      </nav>
    );
  },
);

Root.displayName = "Root";

const Logo = React.forwardRef<
  HTMLAnchorElement,
  HTMLAttributes<HTMLAnchorElement>
>(({ className }) => (
  <Link
    href="/"
    className={clsx("font-monarcha text-eblue text-2xl", className)}
  >
    to pestka
  </Link>
));

Logo.displayName = "Logo";

export const Nav = Object.assign({
  Root,
  TopLinks,
  Logo,
});

const MainNav = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className }) => {
  const { data: session } = useSession();

  const [lastScrollPos, setLastScrollPos] = useState(resetScroll(0));

  useEffect(() => {
    setLastScrollPos(resetScroll(window.scrollY));

    const onScroll = () => {
      const currentScrollPos = window.scrollY;
      setLastScrollPos(({ scrollDownStart, currentScrollDown }) => {
        if (currentScrollPos > currentScrollDown) {
          return { scrollDownStart, currentScrollDown: currentScrollPos };
        }

        return resetScroll(currentScrollPos);
      });
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const userScrolledDown =
    lastScrollPos.currentScrollDown - lastScrollPos.scrollDownStart > SCROLL;

  const useStaticNav = lastScrollPos.currentScrollDown < STATIC_WHEN_FROM_TOP;

  const accordionRef = React.useRef<HTMLDivElement>(null);

  const classNames = cn(
    cn(
      "top-0 bg-eblue z-20 sticky transition-transform text-electric-500",
      className,
    ),
  );

  let transY = useStaticNav || userScrolledDown ? -HEADER_H : 0;
  let duration;

  if (lastScrollPos.currentScrollDown <= HEADER_H) {
    transY += Math.abs(lastScrollPos.currentScrollDown - HEADER_H);
    duration = 0;
  } else {
    duration = 0.3;
  }

  if (accordionRef.current?.getAttribute("data-state") === "open") {
    transY = 0;
  }

  const style = {
    transform: `translateY(${transY}px)`,
    transitionDuration: `${duration}s`,
  };

  return (
    <>
      <Accordion
        style={style}
        collapsible
        className={clsx("lg:hidden", classNames)}
        type="single"
      >
        <AccordionItem
          className="bg-eblue"
          ref={accordionRef}
          value="hamburger"
        >
          <div className="flex justify-between px-6 py-4 w-full">
            <span className="text-xl">to pestka</span>
            <RadixTrigger asChild>
              <button aria-label="menu">
                <Justify className="w-5 h-5" />
              </button>
            </RadixTrigger>
          </div>
          <Content className="text-sm data-[state=closed]:animate-[accordion-up_1100ms] data-[state=open]:animate-[accordion-down_1100ms]">
            <div className="pb-0 border-t-[1px] border-t-fake">
              <TopLinks className="flex [&>li]:border-b-[0.5px] [&>li]:border-fake [&>li]:w-[130px] text-center flex-col border-electric-500 py-12 font-semibold text-lg" />
            </div>
          </Content>
        </AccordionItem>
      </Accordion>

      {/* desktop */}
      <Nav.Root
        style={style}
        className={clsx("bg-ewhite hidden lg:flex", classNames)}
      >
        <Nav.Logo />
        <TopLinks className="flex-row gap-12 text-lg" />
        <div className="flex gap-4">
          {session && (
            <Link
              href="/kurs"
              className="bg-eblue py-1 rounded text-ewhite text-lg pe-4 ps ps-4"
            >
              Kurs
            </Link>
          )}
          <Link
            href={session ? "/api/auth/signout" : "/login"}
            className={`${buttonVariants({ variant: "panel" })} flex items-center`}
          >
            {session ? "Wyloguj" : "Panel logowania"}
          </Link>
        </div>
      </Nav.Root>
    </>
  );
});

MainNav.displayName = "Nav";

export default MainNav;

"use client";

import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Justify from "./icons";
import { useEffect, useLayoutEffect, useState } from "react";
import { cn } from "@/utils/misc";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";
import { AccordionTrigger as RadixTrigger, Content } from "@radix-ui/react-accordion";

const HEADER_H = 500;
const SCROLL = 1;

const resetScroll = (pos: number) => ({
  scrollDownStart: pos,
  currentScrollDown: pos,
});

const Nav = React.forwardRef<any, any>(({ className }, ref) => {
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

  const navHiddenDueToScroll =
    lastScrollPos.currentScrollDown - lastScrollPos.scrollDownStart > SCROLL;

  const navHiddenDueToTop = lastScrollPos.currentScrollDown < HEADER_H;

  const accordionRef = React.useRef<HTMLDivElement>(null);

  const pxTransition = accordionRef.current?.getAttribute('data-state') === 'open' 
    ? 'translate-y-[-395px]' 
    : 'translate-y-[-72px]'

  const classNames = cn(
    cn(
      "top-0 [&>*]:bg-eblue h-16 z-20  text-electric-500 sticky transition-transform duration-200 translate-y-0 lg:hidden",
      (navHiddenDueToScroll || navHiddenDueToTop) && pxTransition,
      className
    )
  );

  return (
    <>
      <Head>
        <title>To pestka!</title>
        <meta name="description" content="Platforma toPestka" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {navHiddenDueToTop && (
        <nav
          className="absolute flex justify-end items-center lg:hidden p-6 w-full h-16 text-electric-500"
        >
          <button aria-expanded="false" aria-label="menu">
            <Justify className="w-5 h-5" />
          </button>
        </nav>
      )}

        <Accordion collapsible className={classNames} type="single">
          <AccordionItem ref={accordionRef} value="hamburger">
            <div className="flex justify-between px-6 py-4 w-full">
              <span className="text-xl">to pestka</span>
              <RadixTrigger  asChild>
                <button aria-label="menu">
                  <Justify className="w-5 h-5" />
                </button>
              </RadixTrigger>
            </div>
            <Content className="text-sm data-[state=closed]:animate-[accordion-up_1100ms] data-[state=open]:animate-[accordion-down_1100ms]" >
              <div className="pb-0 border-t-[1px] border-t-fake">
                <ul className="flex [&>li]:border-b-[0.5px] [&>li]:border-fake [&>li]:w-[130px] text-center flex-col justify-center items-center gap-12 border-electric-500 py-12 font-semibold text-lg">
                  <li>
                    <Link href="#program"> Program </Link>
                  </li>
                  <li>O prowadzących</li>
                  <li>Kup kurs</li>
                  <li>
                    <Link href="#kontakt"> Kontakt </Link>
                  </li>
                </ul>
              </div>
            </Content>
          </AccordionItem>
        </Accordion>

      <nav className="lg:flex justify-between items-center hidden p-10 pt-6 pb-6 border border-b-electric-400 font-medium">
        <Link href="/" className="font-outfit text-2xl">
          to pestka
        </Link>
        <ul className="flex flex-row justify-center items-center space-x-12 text-lg">
          <li>
            <Link href="/" className="">
              Program
            </Link>
          </li>
          <li>
            <Link href="/" className="">
              O prowadzących
            </Link>
          </li>
          <li>
            <Link href="/" className="">
              Kup Kurs
            </Link>
          </li>
          <li>
            <Link href="/" className="">
              Kontakt
            </Link>
          </li>
        </ul>

        
          <Link
            href={session ? "/api/auth/signout" : "/login"}
            className="bg-eblue py-1 rounded text-ewhite text-lg pe-4 ps ps-4"
          >
            {session ? "Wyloguj" : "Panel logowania"}
          </Link>


      </nav>
    </>
  );
});

Nav.displayName = "Nav";

export default Nav;

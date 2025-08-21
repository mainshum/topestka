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

import clsx from "clsx";
import { buttonVariants } from "./Button";

const HEADER_H = 106;
const STATIC_WHEN_FROM_TOP = 500;
const SCROLL = 1;

const resetScroll = (pos: number) => ({
  scrollDownStart: pos,
  currentScrollDown: pos,
});

const NavMobile = ({
  style,
  classNames,
  accordionRef,
  useStaticNav,
}: {
  style: React.CSSProperties;
  classNames?: string;
  accordionRef?: React.RefObject<HTMLDivElement>;
  useStaticNav: boolean;

}) => {

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // hack to close the accordion when the top links are clicked
  const simulateButtonClick = () => {
    buttonRef.current?.click();
  };

  return (
    <Accordion
      style={style}
      collapsible
      className={clsx("lg:hidden", classNames)}
      type="single"
    >
      <AccordionItem ref={accordionRef} value="hamburger">
        <div
          className={cn(
            "flex text-electric-600 justify-between px-6 py-3 w-full h-[54px] ",
            !useStaticNav && "border-b-electric-300 border-b-[1px]",
          )}
        >
          <span className={cn("text-xl font-outfit", useStaticNav && "hidden")}>
            to pestka
          </span>
          <RadixTrigger asChild>
            <button ref={buttonRef} aria-label="menu">
              <Justify className="w-5 h-5" />
            </button>
          </RadixTrigger>
        </div>
        <Content className={cn("text-sm  pb-0 border-b-[1px] data-[state=closed]:animate-[accordion-up_500ms] data-[state=open]:animate-[accordion-down_500ms]", !useStaticNav && "border-b-electric-300")}>
            <TopLinks onClick={simulateButtonClick} className="pl-6 flex gap-8 h-full overflow-hidden text-electric-600 font-monarcha text-3xl items-start flex-col border-electric-500 font-semibold [&>li:first-child]:pt-10 [&>li:last-child]:pb-10" />
        </Content>
      </AccordionItem>
    </Accordion>
  );
};

const TopLinks = React.forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLUListElement>
>(({ className, ...props }) => {
  return (
    <ul
      className={cn(
        "text-eblue gap-8 flex justify-center items-center font-outfit",
        className,
      )}
      {...props}
    >
      <li>
        <Link href="#program" className={buttonVariants({variant: "navlink"})}> Program </Link>
      </li>
      <li>
        <Link href="#o-nas" className={buttonVariants({variant: "navlink"})}>O prowadzących</Link>
      </li>
      <li>
        <Link href="#kup-kurs" className={buttonVariants({variant: "navlink"})}> Kup kurs </Link>
      </li>
      <li>
        <Link href="#kontakt" className={buttonVariants({variant: "navlink"})}> Kontakt </Link>
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
          "lg:flex bg-butter-100 justify-between items-center p-10 py-8 border border-b-eblue-100 font-medium",
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

export const Nav = {
  NavMobile,
  Root,
  TopLinks,
  Logo,
};

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
    "top-0 bg-butter-100 w-full z-20 fixed transition-transform text-electric-500",
    className,
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

  const style: React.CSSProperties = {
    transform: `translateY(${transY}px)`,
    transitionDuration: `${duration}s`,
  };

  return (
    <>
      {/* mobile */}
      <NavMobile
        useStaticNav={useStaticNav}
        style={style}
        classNames={classNames}
        accordionRef={accordionRef}
      />
      {/* desktop */}
      <Nav.Root style={style} className={clsx("hidden lg:flex", classNames)}>
        <Nav.Logo />
        <TopLinks className="flex-row items-center text-lg" />
        <div className="flex gap-4">
          {session && session.user.hasAccess && (
            <Link
              href="/kurs"
              className={`${buttonVariants({ variant: "panel" })} flex items-center`}
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

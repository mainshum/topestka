"use client";

import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Justify from "./icons";
import { useEffect, useLayoutEffect, useState } from "react";
import { cn } from "@/utils/misc";
import React from "react";

const HEADER_H = 64 * 2;
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

  const classNames = cn(
    cn(
      "top-0 bg-eblue h-16  text-electric-500 sticky flex transition-transform duration-200 translate-y-0 justify-between items-center lg:hidden  p-6",
      (navHiddenDueToScroll || navHiddenDueToTop) && "translate-y-[-64px]",
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

      <nav className={classNames}>
        <span className="font-outfit text-xl">to pestka</span>
        <button aria-expanded="false" aria-label="menu">
          <Justify className="w-5 h-5" />
        </button>
      </nav>

      <nav className="lg:flex justify-between items-center hidden p-10 pt-6 pb-6 border border-b-electric-500 font-medium">
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
          href="/cart"
          className="bg-eblue py-1 rounded text-ewhite text-lg pe-4 ps ps-4"
        >
          {" "}
          Panel logowania{" "}
        </Link>
      </nav>
    </>
  );
});

Nav.displayName = "Nav";

export default Nav;

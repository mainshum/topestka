'use client';

import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Justify from "./icons";
import { useEffect, useState } from "react";
import { cn } from "@/utils/misc";

const SCROLL = 80;

const resetScroll = (pos: number) => ({
  scrollDownStart: pos,
  currentScrollDown: pos,
});

const Nav = () => {
  const { data: session } = useSession();

  // track scroll postion

  const [lastScrollPos, setLastScrollPos] = useState(resetScroll(typeof window !== 'undefined' ? window.scrollY : 0));

  useEffect(() => {

    const onScroll = () => {
      const currentScrollPos = window.scrollY;
      setLastScrollPos(({scrollDownStart, currentScrollDown}) => {
        if (currentScrollPos > currentScrollDown) { 
          return {
            scrollDownStart,
            currentScrollDown: currentScrollPos,
          }
        } else {
          return resetScroll(currentScrollPos);
        }
      })
    }

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [])

  const navHidden = (lastScrollPos.currentScrollDown - lastScrollPos.scrollDownStart) > SCROLL;

  return (
    <>
      <Head>
        <title>To pestka!</title>
        <meta name="description" content="Platforma toPestka" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav hidden={navHidden} className={cn("top-0 sticky flex transition-transform duration-200 translate-y-0 justify-between items-center lg:hidden bg-ewhite p-6", navHidden && 'translate-y-[-80px]' )}>
        <span className="font-monarcha font-semibold text-xl">to pestka</span>
        <button aria-expanded="false" aria-label="menu">
          <Justify />
        </button>
      </nav>

      <nav className="lg:flex justify-between items-center hidden p-10 pt-6 pb-6 border border-b-electricOrange">
        <Link href="/" className="monarcha-29">to pestka!</Link>
        <ul className="flex flex-row justify-center items-center space-x-12 outfit-16">
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
        {session && (
          <Link href="/admin" className="">
            Admin
          </Link>
        )}

        <Link href="/cart" className="bg-eblue pt-2 pb-2 rounded text-ewhite outfit-16 pe-4 ps ps-4"> Panel logowania </Link>

      </nav>
    </>
  );
};

export default Nav;

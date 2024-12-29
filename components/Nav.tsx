import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Justify from "./icons";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>To pestka!</title>
        <meta name="description" content="Platforma toPestka" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="top-0 sticky flex justify-end items-center lg:hidden bg-ewhite p-6">
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

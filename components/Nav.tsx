import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>To pestka!</title>
        <meta name="description" content="Platforma toPestka" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="p-4 border-b-eblue border h-20 flex justify-between items-center">
        <Link href="/" className="underline">to pestka!</Link>
        <ul className="flex flex-row justify-center space-x-12">
          <li>
            <Link href="/" className="underline">
              Program
            </Link>
          </li>
          <li>
            <Link href="/" className="underline">
              O prowadzących
            </Link>
          </li>
          <li>
            <Link href="/" className="underline">
              Kup Kurs
            </Link>
          </li>
          <li>
            <Link href="/" className="underline">
              Kontakt
            </Link>
          </li>
        </ul>
        {session && (
          <Link href="/admin" className="underline">
            Admin
          </Link>
        )}

        <Link href="/cart" className="underline">
          <button className="btn btn-primary">Panel logowania</button>
        </Link>

      </nav>
    </>
  );
};

export default Nav;

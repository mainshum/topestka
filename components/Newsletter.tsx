import React from "react";
import Link from "next/link";
import HomeSection from "./HomeSection";
import { Nav } from "./Nav";
import { buttonVariants } from "./Button";
import { NEWSLETTER_URL } from "@/utils/const";

const Newsletter = () => (
  <HomeSection
    id="kontakt"
    className="grid grid-cols-1 md:grid-cols-[auto,410px] grid-rows-[auto] bg-eblue px-10 md:px-20 pt-24 pb-8 h-full text-ewhite"
  >
      <Nav.Logo className="hidden md:block order-0 text-ewhite text-6xl" />
      <div className="flex flex-col items-start order-2 md:order-3 pb-20">
        <p className="md:pt-8 pb-6 font-monarcha text-2xl md:text-3xl">
          Bądź na bieżąco z <br /> działaniami naszej fundacji.
        </p>
        <Link
          href={NEWSLETTER_URL}
          className={buttonVariants({ variant: "program2" })}
        >
          Dołącz do newslettera
        </Link>
      </div>
      <footer className="flex md:flex-row flex-col gap-1 md:gap-4 order-6 md:order-4 pt-24 md:font-light text-butter-100 text-base">
        <Link className="md:order-2" href="/regulamin">Regulamin</Link>
        <Link className="md:order-1" href="/polityka-prywatnosci">Polityka Prywatności</Link>
        <span className="md:order-0">© 2024 Fundacja Bezpestkowe</span>
      </footer>
      <div className="flex flex-col gap-3 order-3 md:order-2 pb-16 font-outfit text-xl md:text-3xl">
        <Link href="https://www.bezpestkowe.pl" target="_blank" rel="noopener noreferrer">www.bezpestkowe.pl</Link>
        <Link href="mailto:topestka.org@gmail.com" target="_blank" rel="noopener noreferrer">topestka.org@gmail.com</Link>
        <Link href="https://www.instagram.com/bezpestkowe/" target="_blank" rel="noopener noreferrer">Instagram</Link>
        <Link href="https://www.facebook.com/groups/bezpestkowe/" target="_blank" rel="noopener noreferrer">
          Facebook
        </Link>
      </div>
      <div className="order-5 md:order-3 pt-5 font-monarcha text-lg md:text-xl">
        Fundacja Bezpestkowe <br />
        Niska 1E/61, 81-646 Gdynia <br />
        KRS - 0000951776 <br />
        NIP - 5862377596 <br />
        REGON - 521286817 <br />
      </div>
      <div className="order-4 pb-4 border-b-2 border-b-orange-white md:border-none text-electric-500 text-base">
        To pestka, to platforma, która powstała z inicjatywy Fundacji
        Bezpestkowe i stanowi jej własność.
      </div>
  </HomeSection>
);

export default Newsletter;

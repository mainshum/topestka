import React from "react";
import Link from "next/link";
import HomeSection from "./HomeSection";
import { Nav } from "./Nav";
import { buttonVariants } from "./Button";

const Newsletter = () => (
  <HomeSection
    id="kontakt"
    className="grid grid-cols-1 grid-rows-[auto] bg-eblue px-10 pt-24 pb-8 h-full text-ewhite"
  >
      <Nav.Logo className="hidden md:block order-1 text-6xl" />
      <div className="flex flex-col items-start order-2 pb-20">
        <p className="pb-6 font-monarcha text-2xl">
          Bądź na bieżąco z <br /> działaniami naszej fundacji.
        </p>
        <Link
          href="https://actionnetwork.org/forms/chce-dolaczyc-do-grona-przyjaciol-bezpestkowych/"
          className={buttonVariants({ variant: "program2" })}
        >
          Dołącz do newslettera
        </Link>
      </div>
      <footer className="flex flex-col gap-1 order-6 pt-24 text-butter-100 text-base">
        <Link href="/regulamin">Regulamin</Link>
        <Link href="/polityka-prywatnosci">Polityka Prywatności</Link>
        <span>© 2024 Fundacja Bezpestkowe</span>
      </footer>
      <div className="flex flex-col gap-3 order-3 pb-16 font-outfit text-xl">
        <Link href="https://www.bezpestkowe.pl">www.bezpestkowe.pl</Link>
        <Link href="mailto:bezpestkowe@gmail.com">bezpestkowe@gmail.com</Link>
        <Link href="https://www.instagram.com/bezpestkowe/">Instagram</Link>
        <Link href="https://www.facebook.com/groups/bezpestkowe/">
          Facebook
        </Link>
      </div>
      <div className="order-5 pt-5 font-monarcha text-lg">
        Fundacja Bezpestkowe <br />
        Niska 1E/61, 81-646 Gdynia <br />
        KRS - 0000951776 <br />
        NIP - 5862377596 <br />
        REGON - 521286817 <br />
      </div>
      <div className="order-4 pb-4 border-b-2 border-b-orange-white text-electric-500 text-base">
        To pestka, to platforma, która powstała z inicjatywy Fundacji
        Bezpestkowe i stanowi jej własność.
      </div>
  </HomeSection>
);

export default Newsletter;

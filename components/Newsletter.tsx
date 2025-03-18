import React from "react";
import Link from "next/link";
import HomeSection from "./HomeSection";
import { Nav } from "./Nav";

const Newsletter = () => (
  <HomeSection
    id="kontakt"
    className="flex h-full flex-wrap bg-eblue gap-16 pt-20 pb-5 text-ewhite md:px-20"
  >
    <section className="flex flex-col justify-between flex-grow">
      <Nav.Logo className="text-6xl" />
      <div>
        <p className="pb-4 font-monarcha text-3xl">
          Bądź na bieżąco z <br /> działaniami naszej fundacji.
        </p>
        <a href="https://actionnetwork.org/forms/chce-dolaczyc-do-grona-przyjaciol-bezpestkowych/">
          <button className="px-4 py-3 bg-[#F6892A] text-ewhite text-xl font-medium rounded-md font-outfit">
            Dołącz do newslettera
          </button>
        </a>
      </div>
      <div className="flex text-sm gap-2">
        <span>© 2024 Fundacja Bezpestkowe</span>
        <Link href="/polityka-prywatnosci">Polityka Prywatności</Link>
        <Link href="/regulamin">Regulamin</Link>
      </div>
    </section>
    <section className="flex flex-col justify-between basis-[432px]">
      <div className="flex flex-col font-outfit text-3xl gap-4">
        <Link href="https://www.bezpestkowe.pl">www.bezpestkowe.pl</Link>
        <Link href="mailto:bezpestkowe@gmail.com">bezpestkowe@gmail.com</Link>
        <Link href="https://www.instagram.com/bezpestkowe/">Instagram</Link>
        <Link href="https://www.facebook.com/groups/bezpestkowe/">
          Facebook
        </Link>
      </div>
      <div className="font-monarcha text-xl">
        Fundacja Bezpestkowe <br />
        Niska 1E/61, 81-646 Gdynia <br />
        KRS - 0000951776 <br />
        NIP - 5862377596 <br />
        REGON - 521286817 <br />
      </div>
      <div className="text-sm text-electric-500">
        To pestka, to platforma, która powstała z inicjatywy Fundacji
        Bezpestkowe i stanowi jej własność.
      </div>
    </section>
  </HomeSection>
);

export default Newsletter;
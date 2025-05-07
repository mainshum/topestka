import React from 'react';
import Link from 'next/link';
import { useKurs } from '../context';

export const Title: React.FC = () => {
  const { currentSubchapter } = useKurs();

  if (!currentSubchapter) return null;

  const isPerspektywaPacjencka = currentSubchapter.chapter === 1;
  const chapterTitle = `Część ${currentSubchapter.chapter}: ${
    isPerspektywaPacjencka ? 'Perspektywa pacjencka' : 'Perspektywa lekarza'
  }`;
  const subchapterTitle = `${currentSubchapter.chapter}.${currentSubchapter.subchapter}: ${currentSubchapter.subchapterTitle}`;

  return (
    <section className="basis-[120px] shrink-0">
      <Link href="/kurs" className="top-4 left-4 font-monarcha text-xl">
        MRKH to pestka!
      </Link>
      <h1 className="pt-5 font-monarcha text-orange-500 text-lg">
        {chapterTitle}
      </h1>
      <h2 className="font-monarcha text-2xl">{subchapterTitle}</h2>
    </section>
  );
};

Title.displayName = 'Kurs.Title'; 
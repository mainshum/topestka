import React from 'react';
import Link from 'next/link';
import { useKurs } from './context';
import { Subchapter } from './data';

const getTitle = (subchapter: Subchapter) => {
  if (subchapter.type === 'video') {
    return `Część 1: ${subchapter.subtype === 'pp' ? 'Perspektywa pacjencka' : 'Perspektywa lekarza'}`;
  }
  return `Część 3: Podsumowanie badania`;
}

const getSubchapterTitle = (subchapter: Subchapter) => {
  if (subchapter.type === 'video') {
    return `1. ${subchapter.partNo}. ${subchapter.title}`;
  }
  return `2. ${subchapter.partNo}. ${subchapter.title}`;
}

export const Title: React.FC = () => {
  return null;
  const { currentSubchapter } = useKurs();

  if (!currentSubchapter) return null;

  return (
    <section className="basis-[120px] shrink-0">
      <Link href="/kurs" className="top-4 left-4 font-monarcha text-xl">
        MRKH to pestka!
      </Link>
      <h1 className="pt-6 pb-1 font-outfit text-orange-500 text-lg">
        {getTitle(currentSubchapter)}
      </h1>
      <h2 className="font-monarcha text-2xl text-eblue-600">{getSubchapterTitle(currentSubchapter)}</h2>
    </section>
  );
};

Title.displayName = 'Kurs.Title'; 
import React from 'react';
import Link from 'next/link';
import { useKurs } from './context';
import { getChapterNo, VideoSubchapter, BroszuraSubchapter, Subchapter } from './data';

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
  const { currentSubchapter } = useKurs();

  if (!currentSubchapter) return null;

  return (
    <section className="basis-[120px] shrink-0">
      <Link href="/kurs" className="top-4 left-4 font-monarcha text-xl">
        MRKH to pestka!
      </Link>
      <h1 className="pt-5 font-monarcha text-orange-500 text-lg">
        {getTitle(currentSubchapter)}
      </h1>
      <h2 className="font-monarcha text-2xl">{getSubchapterTitle(currentSubchapter)}</h2>
    </section>
  );
};

Title.displayName = 'Kurs.Title'; 
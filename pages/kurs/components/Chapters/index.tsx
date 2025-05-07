import React from 'react';
import { Accordion } from '@/components/Accordion';

export const Chapters: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Accordion asChild type="single" collapsible>
      <ol className="grow-[1] basis-[300px]">{children}</ol>
    </Accordion>
  );
};

Chapters.displayName = 'Kurs.Chapters'; 
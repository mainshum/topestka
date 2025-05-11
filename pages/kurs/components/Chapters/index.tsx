import React from 'react';
import { Accordion } from '@/components/Accordion';

export const Chapters: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Accordion asChild type="single" collapsible>
      <ol className="basis-[35%] shrink-0">{children}</ol>
    </Accordion>
  );
};

Chapters.displayName = 'Kurs.Chapters'; 
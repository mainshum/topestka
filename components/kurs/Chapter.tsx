import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion';
import { LoadCircle } from './LoadCircle';
import { useKurs } from './context';

interface ChapterProps {
  chapterNo: number;
  subchapterTitle: string;
  children: React.ReactNode;
  totalSubchapters: number;
}

export const Chapter: React.FC<ChapterProps> = ({
  chapterNo,
  subchapterTitle,
  children,
  totalSubchapters,
}) => {
  const { completedSubchapters } = useKurs();

  const completionPercent = React.useMemo(() => {
    const completedCount = completedSubchapters.filter((item) =>
      item.startsWith(`${chapterNo}.`)
    ).length;

    return totalSubchapters > 0
      ? Math.round((completedCount / totalSubchapters) * 100)
      : 0;
  }, [completedSubchapters, chapterNo, totalSubchapters]);


  return (
    <li>
      <AccordionItem value={`chapter-${chapterNo}`}>
        <AccordionTrigger chevProps={{className: "text-eblue-600"}} className="gap-4 px-0 pt-3 pb-2 border-eblue-400 border-b-[1px] text-nowrap [&>svg]:data-[state=open]:text-eblue-600">
          <div className="flex gap-3">
            <LoadCircle completionPercent={completionPercent} />
            <div className="flex font-outfit flex-col">
              <h1 className="text-sm">Część {chapterNo}</h1>
              <h2 className="text-base">{subchapterTitle}</h2>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent asChild className="pb-0">
          <ol className="flex flex-col items-center pt-2">{children}</ol>
        </AccordionContent>
      </AccordionItem>
    </li>
  );
};

Chapter.displayName = 'Kurs.Chapter'; 
import React from 'react';
import { useKurs } from '../../context';
import { Chapter } from './Chapter';
import { allSubchapters } from '../../data';
import { useRouter } from 'next/router';

export const VideoChapters: React.FC = () => {
  const { currentSubchapter, isCompleted, setCurrentSubchapter } = useKurs();
  const router = useRouter();

  const perspektywaPacjencka = allSubchapters.filter(sc => sc.chapter === 1);
  const perspektywaLekarza = allSubchapters.filter(sc => sc.chapter === 2);

  const makeSubchapterTitle = (sc: typeof allSubchapters[0]) => 
    `${sc.subchapter}: ${sc.subchapterTitle}`;

  const onTimeSelect = (sc: typeof allSubchapters[0]) => {
    setCurrentSubchapter(sc);
    router.push('/kurs?view=video', undefined, { shallow: true });
  };


  return (
    <>
      <Chapter
        chapterNo={1}
        subchapterTitle="MRKH: perspektywa pacjencka"
        totalSubchapters={perspektywaPacjencka.length}
      >
        {perspektywaPacjencka.map((sc) => {
          const title = makeSubchapterTitle(sc);
          return (
            <Chapter.Subchapter
              key={`${sc.chapter}.${title}`}
              isCurrent={sc === currentSubchapter}
              done={isCompleted(`${sc.chapter}.${sc.subchapter}`)}
              onClick={() => onTimeSelect(sc)}
            >
              <span>{title}</span>
            </Chapter.Subchapter>
          );
        })}
      </Chapter>
      <Chapter
        chapterNo={2}
        subchapterTitle="MRKH: perspektywa lekarza"
        totalSubchapters={perspektywaLekarza.length}
      >
        {perspektywaLekarza.map((sc) => {
          const title = makeSubchapterTitle(sc);
          return (
            <Chapter.Subchapter
              key={`${sc.chapter}.${title}`}
              isCurrent={sc === currentSubchapter}
              done={isCompleted(`${sc.chapter}.${sc.subchapter}`)}
              onClick={() => onTimeSelect(sc)}
            >
              <span>{title}</span>
            </Chapter.Subchapter>
          );
        })}
      </Chapter>
    </>
  );
};

VideoChapters.displayName = 'Kurs.VideoChapters'; 
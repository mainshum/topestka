import React from 'react';
import { useKurs } from './context';
import { Chapter } from './Chapter';
import { Subchapter } from './Subchapter';
import { getId } from './data';

const broszura1 = { type: 'broszura' as const, subtype: 'broszura' as const, partNo: 1, title: 'Zespół MRKH - o osobach, które nie mają pestki' };
const broszura2 = { type: 'broszura' as const, subtype: 'broszura' as const, partNo: 2, title: 'O zespole MRKH, jego objawach i kwestiach z nim związanych' };

export const BroszuraChapter: React.FC<{ completed: number }> = ({ completed }) => {
  const { currentSubchapter, isCompleted, setCurrentSubchapter } = useKurs();

  const { partNo } = currentSubchapter;

  return (
    <Chapter
      chapterNo={3}
      subchapterTitle="Broszury"
      totalSubchapters={2}
      completed={completed}
    >
      <Subchapter
        isCurrent={partNo === 1}
        done={isCompleted(getId(broszura1))}
        onClick={() => {
          setCurrentSubchapter(broszura1);
        }}
      >
        1. Zespół MRKH - o osobach, które nie mają pestki
      </Subchapter>
      <Subchapter
        isCurrent={partNo === 2}
        done={isCompleted(getId(broszura2))}
        onClick={() => {
          setCurrentSubchapter(broszura2);
        }}
      >
        2. O zespole MRKH, jego objawach i kwestiach z nim związanych
      </Subchapter>
    </Chapter>
  );
};

BroszuraChapter.displayName = 'Kurs.BroszuraChapter'; 
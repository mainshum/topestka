import React from 'react';
import { useKurs } from './context';
import { Chapter } from './Chapter';
import { Subchapter } from './Subchapter';

export const BroszuraChapter: React.FC = () => {
  const { currentSubchapter, isCompleted, setCurrentSubchapter } = useKurs();

  return (
    <Chapter
      chapterNo={3}
      subchapterTitle="Broszury"
      totalSubchapters={1}
    >
      <Subchapter
        isCurrent={currentSubchapter.type === 'broszura'}
        done={isCompleted('3.1')}
        onClick={() => {
          setCurrentSubchapter({ type: 'broszura', partNo: 1, title: 'Zespół MRKH - o osobach, które nie mają pestki' });
        }}
      >
        1. Zespół MRKH - o osobach, które nie mają pestki
      </Subchapter>
      <Subchapter
        isCurrent={currentSubchapter.title === 'O zespole MRKH, jego objawach i kwestiach z nim związanych'}
        done={isCompleted('3.1')}
        onClick={() => {
          setCurrentSubchapter({ type: 'broszura', partNo: 2, title: 'O zespole MRKH, jego objawach i kwestiach z nim związanych' });
        }}
      >
        2. O zespole MRKH, jego objawach i kwestiach z nim związanych
      </Subchapter>
    </Chapter>
  );
};

BroszuraChapter.displayName = 'Kurs.BroszuraChapter'; 
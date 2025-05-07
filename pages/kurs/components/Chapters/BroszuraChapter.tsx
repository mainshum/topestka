import React from 'react';
import { useKurs } from '../../context';
import { Chapter } from './Chapter';
import { useRouter } from 'next/router';

export const BroszuraChapter: React.FC = () => {
  const { currentSubchapter, isCompleted } = useKurs();
  const router = useRouter();

  return (
    <Chapter
      chapterNo={3}
      subchapterTitle="Broszury"
      totalSubchapters={1}
    >
      <Chapter.Subchapter
        isCurrent={currentSubchapter === 'broszura'}
        done={isCompleted('3.1')}
        onClick={() => {
          router.push('/kurs?view=broszura', undefined, { shallow: true });
        }}
      >
        <span>Broszura</span>
      </Chapter.Subchapter>
    </Chapter>
  );
};

BroszuraChapter.displayName = 'Kurs.BroszuraChapter'; 
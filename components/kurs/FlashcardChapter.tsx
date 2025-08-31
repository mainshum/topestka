import React from 'react';
import { useKurs } from './context';
import { Chapter } from './Chapter';
import { Subchapter } from './Subchapter';
import { getId, flashcardSubchapter } from './data';

const flashcardSubchapterDescription = "Zapoznaj się z zestawem fiszek! Został stworzony przez dr Karinę Kapczuk w celu przeprowadzenia wspierającej rozmowy z rodzicami osób z zespołem MRKH.";

export const FlashcardChapter: React.FC<{ completed: number }> = ({ completed }) => {
  const { currentSubchapter, isCompleted, setCurrentSubchapter } = useKurs();

  return (
    <Chapter
      chapterNo={4}
      subchapterTitle="Zestaw fiszek"
      totalSubchapters={1}
      completed={completed}
      onClick={() => {
        setCurrentSubchapter(flashcardSubchapter);
      }}
    >
      <Subchapter
        isCurrent={currentSubchapter.type === 'flashcard'}
        done={isCompleted(getId(flashcardSubchapter))}
        onClick={() => {
          setCurrentSubchapter(flashcardSubchapter);
        }}
      >
        {flashcardSubchapterDescription}
      </Subchapter>
    </Chapter>
  );
};

FlashcardChapter.displayName = 'Kurs.FlashcardChapter'; 
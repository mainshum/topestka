import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashcardData {
  flashcardNo: number;
  textContent: string;
}

interface FlashcardProps {
  data: FlashcardData[];
}

const FLASHCARD_TITLE = "Mamo dziecka z zespołem MRKH, pamiętaj!";

export const Flashcard: React.FC<FlashcardProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
  };

  const currentCard = data[currentIndex];

  return (
    <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-center w-full pt-10 pb-4 sm:pt-10 sm:pb-10 bg bg-[#B4C0EE] rounded-lg">
      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="p-2 hidden sm:block hover:bg-white/20 rounded-full transition-colors"
        aria-label="Poprzednia fiszka"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>

      {/* Flashcard */}
      <div className="mx-8 text-ewhite md:text-3xl font-monarcha rounded-lg shadow-lg pb-2 pt-3 px-6 h-[300px] md:h-[460px] aspect-[0.85] bg-eblue-600">
        <div className="text-center flex flex-col justify-between h-full">
          <h3 className="text-lg font-semibold mb-4 border-b border-white pb-2">
            {FLASHCARD_TITLE}
          </h3>
          
          <div className="mb-6 flex items-center justify-center">
            {currentCard.textContent}
          </div>
          
          <div className="text-lg font- border-t border-white pt-1">
            Porada nr {currentCard.flashcardNo}
          </div>
        </div>
      </div>
      <div className="flex sm:hidden flex-row items-center justify-center">

      <button
        onClick={goToPrevious}
        className="p-2  hover:bg-white/20 rounded-full transition-colors"
        aria-label="Poprzednia fiszka"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="p-2  hover:bg-white/20 rounded-full transition-colors"
        aria-label="Następna fiszka"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>
      </div>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="p-2 hidden sm:block hover:bg-white/20 rounded-full transition-colors"
        aria-label="Następna fiszka"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>
    </div>
  );
}; 
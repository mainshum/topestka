import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { QuizLayout } from '../quiz-layout';
import { useCounter } from '@/utils/useCounter';
import { cn } from '@/utils/misc';

interface FlashcardData {
  flashcardNo: number;
  textContent: string;
}

interface FlashcardProps {
  data: FlashcardData[];
}

const FLASHCARD_TITLE = "Mamo dziecka z zespołem MRKH, pamiętaj!";

const Header = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => {
  return (
    <h1 ref={ref} className={cn("text-lg font-semibold mb-4 border-b border-white pb-2", props.className)}>
      {children}
    </h1>
  );
});

const Content = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center justify-center", props.className)}>
      {children}
    </div>
  );
});

const Footer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("text-lg font-semibold mb-4 border-b border-white pb-2", props.className)}>
      {children}
    </div>
  );
});

const Root = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className={cn("text-ewhite flex flex-col justify-between text-xl sm:text-3xl font-monarcha rounded-lg shadow-lg pb-2 pt-3 px-6 max-h-[460px] aspect-[0.85] bg-eblue-600", props.className)}>
      {children}
    </div>
  );
});


export const Flashcards: React.FC<FlashcardProps> = ({ data }) => {
  const { count, increment, decrement } = useCounter(0, 0, data.length - 1);

  const currentCard = data[count];

  const hideDecrement = count === 0;
  const hideIncrement = count === data.length - 1;

  return (
    <QuizLayout className='gap-4 flex-wrap max-sm:min-h-0 max-md:bg-inherit'>
      {/* Left Arrow */}
      <button
        onClick={decrement}
        className={cn("p-2 hidden sm:block hover:bg-white/20 rounded-full transition-colors", {
          'opacity-50': hideDecrement,
        })}
        aria-label="Poprzednia fiszka"
        disabled={hideDecrement}
      >
        <ChevronLeft className="w-8 h-8 text-eblue-600" />
      </button>
      <Root>
        <Header>
          {FLASHCARD_TITLE}
        </Header>

        <Content>
          {currentCard.textContent}
        </Content>

        <Footer className='max-sm:border-0 max-sm:mb-0'>
          <span className='hidden sm:inline'>Porada nr {currentCard.flashcardNo}</span>
          <div className="flex sm:hidden flex-row items-center justify-center">

            <button
              onClick={decrement}
              disabled={hideDecrement}
              className={cn("p-2  hover:bg-white/20 rounded-full transition-colors", {
                'opacity-50': hideDecrement,
              })}
              aria-label="Poprzednia fiszka"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={increment}
              disabled={hideIncrement}
              className={cn("p-2  hover:bg-white/20 rounded-full transition-colors", {
                'opacity-50': hideIncrement,
              })}
              aria-label="Następna fiszka"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </Footer>
      </Root>


      {/* Right Arrow */}
      <button
        onClick={increment}
        disabled={hideIncrement}
        className={cn("p-2 hidden sm:block hover:bg-white/20 rounded-full transition-colors", {
          'opacity-50': hideIncrement,
        })}
        aria-label="Następna fiszka"
      >
        <ChevronRight className="w-8 h-8 text-eblue-600" />
      </button>
    </QuizLayout>
  );
};

Header.displayName = 'Flashcard.Header';
Content.displayName = 'Flashcard.Content';
Footer.displayName = 'Flashcard.Footer';
Root.displayName = 'Flashcard.Root';

export const Flashcard = {
  Header,
  Content,
  Footer,
  Root
}

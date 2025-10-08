import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { QuizLayout } from '../quiz-layout';
import { useCounter } from '@/utils/useCounter';
import { cn } from '@/utils/misc';
import { Button } from '../Button';

const Flash = ({ text }: { text: string }) => {
  return (
    <>
      <Header>
        {FLASHCARD_TITLE}
      </Header>

      <Content>
        {text}
      </Content>
    </>
  );
};

const flashcardData: Record<number, (increment: () => void) => React.ReactNode> = {
  0: (increment) => (
    <>
      <Header className='h-10' />
      <Content className='flex flex-col gap-12 py-4'>
        <h1 className='font-outfit'>
          Zapoznaj się z zestawem fiszek!
        </h1>
        <p className='text-xl md:px-20'>
          Został stworzony przez dr Karinę Kapczuk  w celu  przeprowadzenia wspierającej rozmowy z rodzicami osób z zespołem MRKH.
        </p>
        <Button onClick={increment} className='text-lg relative bottom-2' variant='powrot' size='sm'>
          Odkryj fiszki
        </Button>
      </Content>
    </>
  ),
  1: (increment) => <Flash text="Zespół MRKH nie zagraża życiu Twojego dziecka." />,
  2: (increment) => <Flash text="Nie obwiniaj się o to, że córka ma zespół MRKH." />,
  3: (increment) => <Flash text="Uzgodnij z córką, z kim podzielić się informacją czyli komu możecie zaufać i na czyje wsparcie możecie liczyć. " />,
  4: (increment) => <Flash text="Nie wywieraj presji w kwestii podjęcia leczenia wady pochwy. " />,
  5: (increment) => <Flash text="Pamiętaj, że choć 4999 na 5000 kobiet ma macicę, to niepłodność jest problemem, który dotyczy co piątej pary. " />,
};

interface FlashcardData {
  flashcardNo: number;
  textContent: string;
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
    <div ref={ref} className={cn("text-lg font-semibold mb-1 border-t border-white pt-2", props.className)}>
      {children}
    </div>
  );
});

const Root = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className={cn("text-ewhite flex flex-col justify-between text-xl sm:text-3xl font-monarcha rounded-3xl shadow-lg pb-2 pt-3 px-6 max-h-[460px] sm:aspect-[0.85] bg-eblue-600", props.className)}>
      {children}
    </div>
  );
});

interface FlashcardsProps extends React.HTMLAttributes<HTMLDivElement> {
  onCompleted: () => void;
}

export const Flashcards = React.forwardRef<HTMLDivElement, FlashcardsProps>(({ children, onCompleted, ...props }, ref) => {
  const flashcardDataLength = Object.keys(flashcardData).length;
  const { count, increment, decrement } = useCounter(0, 0, flashcardDataLength - 1);


  const incrementAndMarkAsCompleted = () => {
    if (count === flashcardDataLength - 2) {
      onCompleted();
    }
    increment();
  }

  const currentCard = flashcardData[count];

  const hideDecrement = count === 1;
  const hideIncrement = count === flashcardDataLength - 1;

  const rootClass = cn(
    count === 0 ? 'aspect-auto' : 'aspect-[0.85]',
    count === 0 && 'max-w-[680px]',
    count === 0 && 'rounded-3xl'
  )

  return (
    <QuizLayout className='gap-4 flex-wrap max-sm:min-h-0 max-md:bg-inherit'>
      {/* Left Arrow */}
      {count !== 0 && (
        <button
          onClick={decrement}
          className={cn("p-2 hidden sm:block hover:bg-white/20 rounded-full transition-colors", {
            'invisible': hideDecrement,
          })}
          aria-label="Poprzednia fiszka"
          disabled={hideDecrement}
        >
          <ChevronLeft className="w-8 h-8 text-eblue-600" />
        </button>
      )}
      <Root ref={ref} className={rootClass}>
        {currentCard(incrementAndMarkAsCompleted)}
        <Footer className={cn('max-sm:border-0 max-sm:mb-0', count === 0 && 'mt-2 mb-4')}>
          {count !== 0 && (
            <>
              <span className='hidden sm:inline'>Porada nr {count}</span>
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
                  onClick={incrementAndMarkAsCompleted}
                  disabled={hideIncrement}
                  className={cn("p-2  hover:bg-white/20 rounded-full transition-colors", {
                    'opacity-50': hideIncrement,
                  })}
                  aria-label="Następna fiszka"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            </>
          )}
        </Footer>
      </Root>


      {/* Right Arrow */}
      {count !== 0 && (
        <>
          <button
            onClick={incrementAndMarkAsCompleted}
            disabled={hideIncrement}
            className={cn("p-2 hidden sm:block hover:bg-white/20 rounded-full transition-colors", {
              'invisible': hideIncrement,
            })}
            aria-label="Następna fiszka"
          >
            <ChevronRight className="w-8 h-8 text-eblue-600" />
          </button>
        </>
      )}
    </QuizLayout>
  );
});

Flashcards.displayName = 'Flashcards';
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

import React, { useRef, useState } from 'react';
import { Flashcard } from './Flashcard';
import { QuizLayout } from '../quiz-layout';
import { useCounter } from '@/utils/useCounter';
import { cn } from '@/utils/misc';
import { Button } from '../Button';

type Answer = {
    text: string;
    isCorrect: boolean;
}

type QuizData = {
    question: string;
    answers: Answer[];
}

const quizData: QuizData[] = [
    {
        question: 'Co z seksem? Czy będę mogła współżyć?',
        answers: [
            {
                text: 'Nie, zespół MRKH jest równoznaczny z niemożnością uprawiania seksu.',
                isCorrect: false,
            },
            {
                text: 'Tak, zespół MRKH nie wyklucza możliwości podejmowania aktywności seksualnych, jednak w przypadku podejmowania stosunków waginalnych może to wymagać rozszerzenia pochwy.',
                isCorrect: true,
            },
            {
                text: 'To zależy od typu MRKH.',
                isCorrect: false,
            }
        ]
    },
    {
        question: 'Co z tymi przeszczepami macic?',
        answers: [
            {
                text: 'Przeszczepy macic są ogólnodostępne, wystarczy zgłosić się do najbliższej placówki medycznej.',
                isCorrect: false,
            },
            {
                text: 'Jest to wciąż operacja, która jest w fazie testowej i jest niedostępna.',
                isCorrect: false,
            },
            {
                text: 'Przeszczepy macic nie są wykonywane w Polsce, jednak na świecie wykonuje się tego typu zabiegi, które stanowią długi proces.',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Co mogę zrobić z zachyłkiem pochwowym?',
        answers: [
            {
                text: 'Może Pani na własną rękę rozpocząć rozszerzanie pochwy za pomocą dilatorów bądź wibratora.',
                isCorrect: false,
            },
            {
                text: 'Najlepiej nic.',
                isCorrect: false,
            },
            {
                text: 'Można go rozciągnąć na trzy sposoby: za pomocą dilatorów, chirurgicznie bądź z pomocą partnera.',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Czy mam łechtaczkę?',
        answers: [
            {
                text: 'Zespół MRKH wiąże się brakiem macicy, pochwy oraz łechtaczki.',
                isCorrect: false,
            },
            {
                text: 'To zależy od typu MRKH.',
                isCorrect: true,
            },
            {
                text: 'Zespół MRKH nie wpływa na brak łechtaczki, więc tak.',
                isCorrect: false,
            },
        ]
    },
    {
        question: 'Czy muszę mieć partnera by rozszerzyć pochwę?',
        answers: [
            {
                text: 'Nie, jednak należy mieć ukończony 18 rok życia.',
                isCorrect: false,
            },
            {
                text: 'Tak, podjęcie rozszerzania pochwy wymaga stałego partnera i jest to główny wyznacznik kwalifikacyjny.',
                isCorrect: false,
            },
            {
                text: 'Nie, moment rozszerzenia pochwy jest indywidualną decyzją osoby, która się na to decyduje, ale ważne by być w pełni swiadomą tego procesu.',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Czy nie mając macicy, mogę mieć objawy okresu?',
        answers: [
            {
                text: 'Tak, ponieważ osoby z zespołem MRKH mają cykl hormonalny, który może wywoływać takie objawy jak np. zmiany stanu cery lub nastroju.',
                isCorrect: true,
            },
            {
                text: 'Nie, ponieważ za objawy związane z etapem cyklu mentruacyjnego odpowiada macica.',
                isCorrect: false,
            },
            {
                text: 'Nie wiem, może.',
                isCorrect: false,
            },
        ]
    },
    {
        question: 'To nie będę mogła zostać mamą?',
        answers: [
            {
                text: 'Będzie Pani mogła jedynie po przeszczepie macicy.',
                isCorrect: false,
            },
            {
                text: 'Nie, nie ma takiej możliwości.',
                isCorrect: false,
            },
            {
                text: 'Zostać rodzicem można także na drodze adopcji, czy surogacji.',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Czy będę przechodzić menopauzę jak nie mam okresu?',
        answers: [
            {
                text: 'Nie, ponieważ nie miała Pani cyklu menstruacyjnego.',
                isCorrect: false,
            },
            {
                text: 'To zależy od typu MRKH.',
                isCorrect: false,
            },
            {
                text: 'Oczywiście, mimo braku comiesięcznego krwawienia, posiada Pani cykl menstruacyjny.',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Nie mogę zajść w ciąże, to nie muszę się zabezpieczać prawda?',
        answers: [
            {
                text: 'Nie ma takiej potrzeby.',
                isCorrect: false,
            },
            {
                text: 'Wystarczy stosować antykoncepcję hormonalną.',
                isCorrect: false,
            },
            {
                text: 'Prezerwatywy chronią przede wszystkim przed chorobami przenoszonymi drogą płciową, więc jak najbardziej trzeba.',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Czy mój partner/partnerka może rozpoznać, że mam MRKH w trakcie współżycia?',
        answers: [
            {
                text: 'To jest mało prawdopodobne.',
                isCorrect: true,
            },
            {
                text: 'Zależy od tego, czy pochwa była poszerzana za pomocą dilatorów, czy chirurgicznie.',
                isCorrect: false,
            },
            {
                text: 'Tak, jest to całkiem powszechne.',
                isCorrect: false,
            },
        ]
    },
    {
        question: 'Czy w zależności od typu MRKH mogę mieć choroby towarzyszące?',
        answers: [
            {
                text: 'Mając zespół MRKH zawsze istnieją choroby towarzyszące.',
                isCorrect: false,
            },
            {
                text: 'Przy zespole MRKH nie występują inne choroby.',
                isCorrect: false,
            },
            {
                text: 'W zależności od typu MRKH mogą występować np. wady układu moczowego, wady układu kostnego, czy wady serca i dużych naczyń.',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Jakie są krytyczne etapy w życiu osoby z zespołem MRKH?',
        answers: [
            {
                text: 'Diagnoza, okres dojrzewania, leczenie aplazji pochwy, okres menopauzy.',
                isCorrect: false,
            },
            {
                text: 'Rozpoznanie, leczenie aplazji pochwy, wstępowanie w związek partnerski, decyzja o macierzyństwie.',
                isCorrect: true,
            },
            {
                text: 'Rozpoznanie, rozmowa z osobą partnerską, leczenie aplazji pochwy, regularne wizyty ginekologiczne.',
                isCorrect: false,
            },
        ]
    },
    {
        question: 'W przypadku nieletniej pacjentki komu należy przekazać diagnozę?',
        answers: [
            {
                text: 'Jedynie opiekunowi prawnemu bez obecności pacjentki.',
                isCorrect: false,
            },
            {
                text: 'Bezpośrednio pacjentce w obecności opiekuna prawnego.',
                isCorrect: true,
            },
            {
                text: 'Bezpośrednio pacjentce bez obecności opiekuna prawnego.',
                isCorrect: false,
            },
        ]
    },
    {
        question: 'Czy zespół MRKH należy diagnozować w jak najmłodszym wieku?',
        answers: [
            {
                text: 'Tak, im wcześniej przystąpimy do badań i leczenia (np. aplazji pochwy), tym lepiej dla pacjentki.',
                isCorrect: false,
            },
            {
                text: 'Nie ma takiej potrzeby, ponieważ do leczenia aplazji pochwy pacjetnka przystąpić powinna dopiero gdy będzie dojrzała emocjonalne i nie wcześniej niż mając 16 lat.',
                isCorrect: false,
            },
            {
                text: 'W przypadku typu II choroby współtowarzyszące zazwyczaj są diagnozowane przed wykryciem aplazji lub hipoplazji macicy oraz pochwy, które diagnozuje się zazwyczaj w okolicach 16 roku życia, diagnozowanie zespołu MRKH we wcześniejszym wieku może powodować błędy diagnostyczne.',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Jakie badania należy wykonać podczas diagnozowania zespołu MRKH?',
        answers: [
            {
                text: 'Laparoskopia diagnostyczna, badanie przezodbytnicze, USG miednicy mniejszej, leczenie hormonalne.',
                isCorrect: false,
            },
            {
                text: 'Laparoskopia diagnostyczna, USG miednicy mniejszej, badania hormonalne, badanie ginekologiczne.',
                isCorrect: false,
            },
            {
                text: 'USG miednicy mniejszej, badanie ginekologiczne, badania hormonalne, rezonans magnetyczny.',
                isCorrect: true,
            },
        ]
    },
]

const indToLetter = (index: number) => {
    return String.fromCharCode(65 + index);
}

type AnswerState = { type: 'correct', index: number } | { type: 'incorrect', index: number } | { type: 'pending' };

export const QuizChapter: React.FC = () => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { count, increment } = useCounter(0, 0, quizData.length - 1);
    const [answerState, setAnswerState] = useState<AnswerState>({ type: 'pending' });

    const currentQuestion = quizData[count];

    const handleAnswer = (isCorrect: boolean, cardIndex: number) => {
        if (timeoutRef.current) {
            return;
        }

        if (!isCorrect) {
            setAnswerState({ type: 'incorrect', index: cardIndex });
            return;
        }

        setAnswerState({ type: 'correct', index: cardIndex });
        timeoutRef.current = setTimeout(() => {
            increment();
            setAnswerState({ type: 'pending' });
            timeoutRef.current = null;
        }, 1000);
    }


    const getExtraCardClass = (cardIndex: number) => {
        if (answerState.type === 'pending' || answerState.index !== cardIndex) {
            return null;
        }

        if (answerState.type === 'correct') {
            return 'outline-2 !outline-[#34C759] !hover:outline-[#34C759]';
        }

        return 'outline-2 !outline-[#FF3B2F] !hover:outline-[#FF3B2F]';
    }

    const answerText: Record<AnswerState['type'], string> = {
        correct: 'Prawidłowa odpowiedź! Gratulacje!',
        incorrect: 'Niestety, to nie jest dobra odpowiedź. Spróbuj ponownie.',
        pending: 'Zaznacz odpowiedź, żeby odpowiedzieć na pytanie.',
    }


    return (
        <QuizLayout className='flex-col px-8 h-[580px]'>
            <Flashcard.Root className='md:w-[680px] h-[400px] bg-butter-100 text-eblue-600'>
                <Flashcard.Header className='border-eblue-200' />
                <Flashcard.Content className='flex flex-col gap-10 text-lg md:text-2xl'>
                    <p>Sprawdź poziom swojej wiedzy rozwiązując quiz, który składa się z najczęściej zadawanych pytań przez bezpestkowe, czyli osoby mające zespół MRKH. </p>
                    <Button onClick={increment} variant='kupkurs' className='!text-lg px-7 rounded-xl hidden md:inline' size='lg'>
                        Rozpocznij quiz
                    </Button>
                    <Button onClick={increment} variant='kupkurs' className='!text-lg px-7 rounded-xl md:hidden inline' size='sm'>
                        Rozpocznij quiz
                    </Button>
                </Flashcard.Content>
                <Flashcard.Footer className='border-eblue-200' />
            </Flashcard.Root>
            {/* <h1 className='text-lg font-outfit font-medium'>Pytanie nr {count + 1}</h1>
            <h2 className='text-3xl font-monarcha'>{currentQuestion.question}</h2>
            <div className='flex flex-row gap-4 py-6 flex-wrap justify-center'>
                {currentQuestion.answers.map((answer, index) => (
                    <Flashcard.Root onClick={() => handleAnswer(answer.isCorrect, index)} className={cn('w-56 !h-44 justify-start items-stretch bg-butter-100 text-eblue-600 cursor-pointer outline outline-0 hover:outline-eblue-600 hover:outline-2 px-9 pt-5 ', getExtraCardClass(index))} key={answer.text}>
                        <Flashcard.Header className='text-sm border border-b-2 border-b-eblue-600 text-left pb-0'>
                            Odpowiedź {indToLetter(index)}
                        </Flashcard.Header>
                        <Flashcard.Content className={cn('!h-auto text-left justify-start', answer.text.length < 100 ? 'text-base' : answer.text.length < 135 ? 'text-sm' : 'text-xs')}>
                            {answer.text}
                        </Flashcard.Content>
                    </Flashcard.Root>
                ))}
            </div>
            <h3 className={cn('text-xl font-semibold font-outfit tracking-[-1px]', {
                'text-eblue-400': answerState.type === 'pending',
                'text-eblue-600': answerState.type === 'correct' || answerState.type === 'incorrect',
            })}> {answerText[answerState.type]} </h3> */}

        </QuizLayout>
    );
};

QuizChapter.displayName = 'Kurs.QuizChapter'; 
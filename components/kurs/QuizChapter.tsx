import React, { useRef, useState } from 'react';
import { useKurs } from './context';
import { Chapter } from './Chapter';
import { Subchapter } from './Subchapter';
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
                text: 'nie, zespół MRKH jest równoznaczny z niemożnością uprawiania seksu',
                isCorrect: false,
            },
            {
                text: 'tak, zespół MRKH nie wyklucza możliwości podejmowania aktywności seksualnych, jednak w przypadku podejmowania stosunków waginalnych może to wymagać rozszerzenia pochwy',
                isCorrect: true,
            },
            {
                text: 'to zależy od typu MRKH',
                isCorrect: false,
            }
        ]
    },
    {
        question: 'Co z tymi przeszczepami macic?',
        answers: [
            {
                text: 'przeszczepy macic są ogólnodostępne, wystarczy zgłosić się do najbliższej placówki medycznej',
                isCorrect: false,
            },
            {
                text: 'jest to wciąż operacja, która jest w fazie testowej i jest niedostępna',
                isCorrect: false,
            },
            {
                text: 'przeszczepy macic nie są wykonywane w Polsce, jednak na świecie wykonuje się tego typu zabiegi, które stanowią długi proces',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Co mogę zrobić z zachyłkiem pochwowym?',
        answers: [
            {
                text: 'może Pani na własną rękę rozpocząć rozszerzanie pochwy za pomocą dilatorów bądź wibratora',
                isCorrect: false,
            },
            {
                text: 'najlepiej nic',
                isCorrect: false,
            },
            {
                text: 'można go rozciągnąć na trzy sposoby: za pomocą dilatorów, chirurgicznie bądź z pomocą partnera',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Czy mam łechtaczkę?',
        answers: [
            {
                text: 'zespół MRKH wiąże się brakiem macicy, pochwy oraz łechtaczki',
                isCorrect: false,
            },
            {
                text: 'to zależy od typu MRKH',
                isCorrect: true,
            },
            {
                text: 'zespół MRKH nie wpływa na brak łechtaczki, więc tak',
                isCorrect: false,
            },
        ]
    },
    {
        question: 'Czy muszę mieć partnera by rozszerzyć pochwę?',
        answers: [
            {
                text: 'nie, jednak należy mieć ukończony 18 rok życia',
                isCorrect: false,
            },
            {
                text: 'tak, podjęcie rozszerzania pochwy wymaga stałego partnera i jest to główny wyznacznik kwalifikacyjny',
                isCorrect: false,
            },
            {
                text: 'nie, moment rozszerzenia pochwy jest indywidualną decyzją osoby, która się na to decyduje, ale ważne by być w pełni swiadomą tego procesu',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Czy nie mając macicy, mogę mieć objawy okresu?',
        answers: [
            {
                text: 'tak, ponieważ osoby z zespołem MRKH mają cykl hormonalny, który może wywoływać takie objawy jak np. zmiany stanu cery lub nastroju',
                isCorrect: true,
            },
            {
                text: 'nie, ponieważ za objawy związane z etapem cyklu mentruacyjnego odpowiada macica',
                isCorrect: false,
            },
            {
                text: 'nie wiem, może',
                isCorrect: false,
            },
        ]
    },
    {
        question: 'To nie będę mogła zostać mamą?',
        answers: [
            {
                text: 'będzie Pani mogła jedynie po przeszczepie macicy',
                isCorrect: false,
            },
            {
                text: 'nie, nie ma takiej możliwości',
                isCorrect: false,
            },
            {
                text: 'zostać rodzicem można także na drodze adopcji, czy surogacji',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Czy będę przechodzić menopauzę jak nie mam okresu?',
        answers: [
            {
                text: 'nie, ponieważ nie miała Pani cyklu menstruacyjnego',
                isCorrect: false,
            },
            {
                text: 'to zależy od typu MRKH',
                isCorrect: false,
            },
            {
                text: 'oczywiście, mimo braku comiesięcznego krwawienia, posiada Pani cykl menstruacyjny',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Nie mogę zajść w ciąże, to nie muszę się zabezpieczać prawda?',
        answers: [
            {
                text: 'nie ma takiej potrzeby',
                isCorrect: false,
            },
            {
                text: 'wystarczy stosować antykoncepcję hormonalną',
                isCorrect: false,
            },
            {
                text: 'prezerwatywy chronią przede wszystkim przed chorobami przenoszonymi drogą płciową, więc jak najbardziej trzeba',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Czy mój partner/partnerka może rozpoznać, że mam MRKH w trakcie współżycia?',
        answers: [
            {
                text: 'to jest mało prawdopodobne',
                isCorrect: true,
            },
            {
                text: 'zależy od tego, czy pochwa była poszerzana za pomocą dilatorów, czy chirurgicznie',
                isCorrect: false,
            },
            {
                text: 'tak, jest to całkiem powszechne',
                isCorrect: false,
            },
        ]
    },
    {
        question: 'Czy w zależności od typu MRKH mogę mieć choroby towarzyszące?',
        answers: [
            {
                text: 'mając zespół MRKH zawsze istnieją choroby towarzyszące',
                isCorrect: false,
            },
            {
                text: 'przy zespole MRKH nie występują inne choroby',
                isCorrect: false,
            },
            {
                text: 'w zależności od typu MRKH mogą występować np. wady układu moczowego, wady układu kostnego, czy wady serca i dużych naczyń',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Jakie są krytyczne etapy w życiu osoby z zespołem MRKH?',
        answers: [
            {
                text: 'diagnoza, okres dojrzewania, leczenie aplazji pochwy, okres menopauzy',
                isCorrect: false,
            },
            {
                text: 'rozpoznanie, leczenie aplazji pochwy, wstępowanie w związek partnerski, decyzja o macierzyństwie',
                isCorrect: true,
            },
            {
                text: 'rozpoznanie, rozmowa z osobą partnerską, leczenie aplazji pochwy, regularne wizyty ginekologiczne',
                isCorrect: false,
            },
        ]
    },
    {
        question: 'W przypadku nieletniej pacjentki komu należy przekazać diagnozę?',
        answers: [
            {
                text: 'jedynie opiekunowi prawnemu bez obecności pacjentki',
                isCorrect: false,
            },
            {
                text: 'bezpośrednio pacjentce w obecności opiekuna prawnego',
                isCorrect: true,
            },
            {
                text: 'bezpośrednio pacjentce bez obecności opiekuna prawnego',
                isCorrect: false,
            },
        ]
    },
    {
        question: 'Czy zespół MRKH należy diagnozować w jak najmłodszym wieku?',
        answers: [
            {
                text: 'tak, im wcześniej przystąpimy do badań i leczenia (np. aplazji pochwy), tym lepiej dla pacjentki',
                isCorrect: false,
            },
            {
                text: 'nie ma takiej potrzeby, ponieważ do leczenia aplazji pochwy pacjetnka przystąpić powinna dopiero gdy będzie dojrzała emocjonalne i nie wcześniej niż mając 16 lat',
                isCorrect: false,
            },
            {
                text: 'w przypadku typu II choroby współtowarzyszące zazwyczaj są diagnozowane przed wykryciem aplazji lub hipoplazji macicy oraz pochwy, które diagnozuje się zazwyczaj w okolicach 16 roku życia, diagnozowanie zespołu MRKH we wcześniejszym wieku może powodować błędy diagnostyczne',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'Jakie badania należy wykonać podczas diagnozowania zespołu MRKH?',
        answers: [
            {
                text: 'laparoskopia diagnostyczna, badanie przezodbytnicze, USG miednicy mniejszej, leczenie hormonalne',
                isCorrect: false,
            },
            {
                text: 'laparoskopia diagnostyczna, USG miednicy mniejszej, badania hormonalne, badanie ginekologiczne',
                isCorrect: false,
            },
            {
                text: 'USG miednicy mniejszej, badanie ginekologiczne, badania hormonalne, rezonans magnetyczny',
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
        pending: 'Wybierz poprawną odpowiedź',
    }

    return (
        <QuizLayout className='flex-col px-8'>
            <h1 className='text-lg font-outfit font-medium'>Pytanie nr {count + 1}</h1>
            <h2 className='text-3xl font-monarcha'>{currentQuestion.question}</h2>
            <div className='flex flex-row gap-4 py-6 flex-wrap justify-center'>
                {currentQuestion.answers.map((answer, index) => (
                    <Flashcard.Root onClick={() => handleAnswer(answer.isCorrect, index)} className={cn('w-56 !h-44 bg-butter-100 text-eblue-600 cursor-pointer outline outline-0 hover:outline-eblue-600 hover:outline-2', getExtraCardClass(index))} key={answer.text}>
                        <Flashcard.Header className='text-sm'>
                            Odpowiedź {indToLetter(index)}
                        </Flashcard.Header>
                        <Flashcard.Content className={cn('text-sm !h-auto')}>
                            {answer.text}
                        </Flashcard.Content>
                    </Flashcard.Root>
                ))}
            </div>
            <h3 className={cn('text-lg font-bold', {
                'text-eblue-400': answerState.type === 'pending',
                'text-eblue-600': answerState.type === 'correct' || answerState.type === 'incorrect',
            })}> {answerText[answerState.type]} </h3>

        </QuizLayout>
    );
};

QuizChapter.displayName = 'Kurs.QuizChapter'; 
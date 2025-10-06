import React, { useRef, useState } from 'react';
import { Flashcard } from './Flashcard';
import { QuizLayout } from '../quiz-layout';
import { useCounter } from '@/utils/useCounter';
import { cn } from '@/utils/misc';
import { Button, buttonVariants } from '../Button';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { trpc } from '@/utils/trpc';

const POINTS_TO_PASS = 14;

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
                isCorrect: false,
            },
            {
                text: 'Zespół MRKH nie wpływa na brak łechtaczki, więc tak.',
                isCorrect: true,
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


const Result = ({ points, onCheckAnswers, onCertyfikatDownload }: { points: number, onCheckAnswers: () => void, onCertyfikatDownload: () => void }) => {
    const isSuccess = points >= POINTS_TO_PASS;

    return (
        <Flashcard.Root className='md:w-[680px] md:h-[400px] bg-butter-100 text-eblue-600 '>
            <Flashcard.Header className='border-eblue-200' />
            <Flashcard.Content className='flex flex-col gap-10 text-lg md:text-2xl max-sm:pb-4'>
                {isSuccess && (
                    <h1 className='text-2xl font-monarcha'>Gratulacje! <br />Od teraz rozmowa o zespole MRKH powinna być dla Ciebie pestką!</h1>
                )}
                {!isSuccess && (
                    <h1 className='text-2xl font-monarcha'>Twój wynik to:</h1>
                )}
                <p className='text-4xl font-monarcha text-electric-600'>{points} / {quizData.length}</p>
                {!isSuccess && (
                    <p className='text-base font-outfit text-electric-600'>
                        Aby uzyskać certyfikat musisz udzielić minimum 14 poprawnych odpowiedzi. Zanim ponownie rozwiążesz quiz, przeanalizuj swoje odpowiedzi. Poprawnie udzielone odpowiedzi będą zaznaczone na zielono, natomiast błędy na czerwono.
                    </p>
                )}
                {isSuccess && (
                    <Button variant='kupkurs' className='!text-lg px-7 rounded-xl' size='lg' onClick={onCertyfikatDownload}>Odbierz certyfikat</Button>
                )}
                {!isSuccess && (
                    <>
                        <Button variant='kupkurs' className='!text-sm px-7 rounded-xl inline-block sm:hidden' size='sm' onClick={onCheckAnswers}>Sprawdź swoje odpowiedzi</Button>
                        <Button variant='kupkurs' className='!text-lg px-7 rounded-xl sm:inline-block hidden' size='lg' onClick={onCheckAnswers}>Sprawdź swoje odpowiedzi</Button>
                    </>
                )}
            </Flashcard.Content>
            <Flashcard.Footer className='border-eblue-200' />
        </Flashcard.Root>
    )
}


export const QuizChapter = React.forwardRef<HTMLDivElement, { onQuizReset: () => void, onCertyfikatDownload: () => void }>(({ onQuizReset, onCertyfikatDownload }, outRef) => {
    const { count, increment, reset, decrement } = useCounter(0, 0, quizData.length - 1);
    const [stage, setStage] = useState<'intro' | 'quiz' | 'result' | 'validation'>('intro');
    const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
    const [points, setPoints] = useState(0);
    const { update, data: session } = useSession();
    const updateQuizStatus = trpc.user.updateQuizStatus.useMutation();

    const handleAnswer = (answerIndex: number, currentQuestion: QuizData) => {
        if (stage === 'validation') return;

        const { isCorrect } = currentQuestion.answers[answerIndex];
        setUserAnswers(prev => ({ ...prev, [count]: answerIndex }));
        if (isCorrect) {
            setPoints(prev => prev + 1);
        }
        if (count !== quizData.length - 1) {
            increment();
            return;
        }
        if (points >= POINTS_TO_PASS) {
            updateQuizStatus.mutate(undefined, {
                onSuccess: () => {
                    update({ user: { ...session?.user, quizPassed: true } });
                }
            });
        }

        setStage('result');
    }


    const handleCheckAnswers = () => {
        reset();
        setStage('validation');
    }

    const currentQuestion = quizData[count];

    const quizLayout = cn('flex-col px-4 sm:px-28 min-h-[580px] items-stretch justify-start gap-6 !py-12 text-eblue-600', {
        'justify-start': stage === 'quiz',
        'justify-center': stage === 'result' || stage === 'intro',
        'items-center': stage === 'result' || stage === 'intro',
        'items-stretch': stage === 'quiz',
    });

    const currentCorrectIndex = currentQuestion.answers.findIndex(answer => answer.isCorrect);
    const usersAnswerIndex = userAnswers[count];

    const buttonClass = (index: number) => {
        const baseClass = 'flex flex-col gap-6 bg-butter-100 rounded-xl py-4 px-6 outline-0 outline focus:outline-2 focus:outline-black';
        if (stage === 'quiz') {
            return cn(baseClass, 'hover:outline-eblue-600 hover:outline-2');
        }
        const thisAnswerWasUserAnswer = index === usersAnswerIndex;
        const thisAnswerIsCorrect = index === currentCorrectIndex;
        const thisAnswerIsIncorrect = index !== currentCorrectIndex;

        if (thisAnswerIsCorrect) {
            return cn(baseClass, 'outline-green-600 outline-2');
        }
        if (thisAnswerIsIncorrect && thisAnswerWasUserAnswer) {
            return cn(baseClass, 'outline-red-600 outline-2');
        }
        return cn(baseClass);
    }

    return (
        <QuizLayout className={quizLayout}>
            {stage === 'intro' && (
                <Flashcard.Root ref={outRef} className='md:w-[680px] md:h-[400px] bg-butter-100 text-eblue-600'>
                    <Flashcard.Header className='border-eblue-200' />
                    <Flashcard.Content className='flex flex-col gap-10 text-lg md:text-2xl max-sm:pb-4'>
                        <p>Sprawdź poziom swojej wiedzy rozwiązując quiz, który składa się z najczęściej zadawanych pytań przez bezpestkowe, czyli osoby mające zespół MRKH. </p>
                        <Button onClick={() => setStage('quiz')} variant='kupkurs' className='!text-lg px-7 rounded-xl hidden md:inline' size='lg'>
                            Rozpocznij quiz
                        </Button>
                        <Button onClick={() => setStage('quiz')} variant='kupkurs' className='!text-lg px-7 rounded-xl md:hidden inline' size='sm'>
                            Rozpocznij quiz
                        </Button>
                    </Flashcard.Content>
                    <Flashcard.Footer className='border-eblue-200' />
                </Flashcard.Root>
            )}
            {(stage === 'quiz' || stage === 'validation') && (
                <>
                    <h1 className='text-lg font-outfit font-semibold pb-2'>Pytanie {count + 1}</h1>
                    <h2 className='text-xl sm:text-2xl font-monarcha pb-2'>{currentQuestion.question}</h2>
                    {currentQuestion.answers.map((answer, index) => {
                        return ((
                            <button key={answer.text} onClick={() => handleAnswer(index, currentQuestion)} disabled={stage === 'validation'} className={buttonClass(index)}>
                                <span className='text-sm font-outfit border-b border-eblue-200 text-left'>Odpowiedź {indToLetter(index)}</span>
                                <span className='text-base font-monarcha text-left'>{answer.text}</span>
                            </button>
                        ))
                    })}
                    {stage === 'validation' && (
                        <div className={cn('flex flex-row gap-2 self-center sm:self-end', {
                            'self-center sm:self-center': quizData.length - 1 === count,
                            'self-center sm:self-end': quizData.length - 1 !== count,
                        })}>
                            {quizData.length - 1 === count ? (
                                <Button variant='panel' className='!text-sm' size='lg' onClick={onQuizReset}>
                                    Spróbuj ponownie
                                </Button>
                            ) : (
                                <>
                                    <button className='border border-eblue-600 rounded-lg w-6 h-6 flex items-center justify-center' disabled={count === 0} onClick={decrement} >
                                        <ArrowLeft className={cn('w-4 h-4', {
                                            'opacity-50': count === 0,
                                        })} />
                                    </button>
                                    <button className='border border-eblue-600 rounded-lg w-6 h-6 flex items-center justify-center' disabled={count === quizData.length - 1} onClick={increment} >
                                        <ArrowRight className={cn('w-4 h-4', {
                                            'opacity-50': count === quizData.length - 1,
                                        })} />
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
            {stage === 'result' && (
                <Result points={points} onCheckAnswers={handleCheckAnswers} onCertyfikatDownload={onCertyfikatDownload} />
            )}
        </QuizLayout>
    );
});

QuizChapter.displayName = 'Kurs.QuizChapter'; 
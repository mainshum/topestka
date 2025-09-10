export type VideoSubchapter = {
  partNo: number;
  type: 'video'
  subtype: 'pp' | 'pl';
  title: string;
  from: number;
  to: number;
}

export type BroszuraSubchapter = {
  type: 'broszura';
  subtype: 'broszura',
  partNo: number;
  title: string;
}

export type FlashcardSubchapter = {
  type: 'flashcard';
  subtype: 'flashcard';
  partNo: number;
  title: string;
}

export type QuizSubchapter = {
  type: 'quiz';
  subtype: 'quiz';
  partNo: number;
  title: string;
}

export type Subchapter = VideoSubchapter | BroszuraSubchapter | FlashcardSubchapter | QuizSubchapter;

  export const chapters = {
    video: {
      title: "MRKH: perspektywa pacjencka",
      subchapters: [
        { title: "Kim jesteśmy?", from: 5, to: 53 },
        { title: "Czym jest zespół MRKH i z czym się wiąże?", from: 53, to: 4 * 60 + 38 },
        { title: "Siedem rad dla Bezpestkowych", from: 4 * 60 + 38, to: 7 * 60 + 51 },
        { title: "Kluczowe punkty w życiu osób z zespołem MRKH", from: 7 * 60 + 51, to: 15 * 60 + 5 },
        { title: "Wnioski", from: 15 * 60 + 5, to: 16 * 60 + 11 },
        { title: "Raport dotyczący komunikacji lekarzy z pacjentami", from: 16 * 60 + 11, to: 18 * 60 + 19 },
        { title: "Dwie historie pacjentek z zespołem MRKH", from: 18 * 60 + 19, to: 21 * 60 + 48 },
        { title: "Wnioski", from: 21 * 60 + 48, to: 24 * 60 + 17 },
        { title: "Dlaczego istotnie jest słuchanie organizacji pacjenckich", from: 24 * 60 + 15, to: 24 * 60 + 57 },
        { title: "Czym jest zespół MRKH?", from: 24 * 60 + 57, to: 35 * 60 + 19 },
        { title: "Jak rozpoznać MRKH?", from: 35 * 60 + 19, to: 48 * 60 + 51 },
        { title: "W jaki sposób przekazywać diagnozę o zespole MRKH?", from: 48 * 60 + 51, to: 52 * 60 + 32 },
        { title: "Z czym się wiąże MRKH?", from: 52 * 60 + 32, to: Infinity },
      ]
    },
    badanie: {
      title: "Podsumowanie badania - publikacja",
      subchapters: [
        { title: "Wszystko zaczyna się w gabinecie, czyli o tym, jak studenci i studentki są przygotowywani do komunikacji z pacjentami i pacjentkami." },
      ]
    },
    broszura: {
      title: "Broszury",
      subchapters: [
        { title: "Zespół MRKH - o osobach, które nie mają pestki" },
        { title: "O zespole MRKH, jego objawach i kwestiach z nim związanych" },
      ]
    },
    flashcard: {
      title: "Zestaw fiszek",
      subchapters: [
        { title: "Zapoznaj się z zestawem fiszek! Został stworzony przez dr Karinę Kapczuk w celu przeprowadzenia wspierającej rozmowy z rodzicami osób z zespołem MRKH." },
      ]
    },
    quiz: {
      title: "Quiz wiedzy o MRKH",
      subchapters: [
        { title: "Rozwiąż quiz, aby ukończyć kurs." },
      ]
    }
  }
export const flashcardData = [
  {
    flashcardNo: 1,
    textContent: "Zespół MRKH nie zagraża życiu Twojego dziecka."
  },
  {
    flashcardNo: 2,
    textContent: "Nie obwiniaj się o to, że córka ma zespół MRKH."
  },
  {
    flashcardNo: 3,
    textContent: "Uzgodnij z córką, z kim podzielić się informacją czyli komu możecie zaufać i na czyje wsparcie możecie liczyć. "
  },
  {
    flashcardNo: 4,
    textContent: "Nie wywieraj presji w kwestii podjęcia leczenia wady pochwy. "
  },
  {
    flashcardNo: 5,
    textContent: "Pamiętaj, że choć 4999 na 5000 kobiet ma macicę, to niepłodność jest problemem, który dotyczy co piątej pary. "
  },
];

export const flashcardSubchapter: FlashcardSubchapter = {
  type: 'flashcard',
  subtype: 'flashcard',
  partNo: 1,
  title: "Kilka porad dla mam osób z MRKH"
};

export const quizSubchapter: QuizSubchapter = {
  type: 'quiz',
  subtype: 'quiz',
  partNo: 1,
  title: "Quiz wiedzy o MRKH"
};

export const getId = (subchapter: Subchapter) => {
  return `${subchapter.type}#${subchapter.subtype}#${subchapter.partNo}`;
}
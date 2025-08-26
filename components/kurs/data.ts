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

export const videoSubchapters = new Map<number, VideoSubchapter>([
  [1, { partNo: 1, type: 'video', subtype: 'pp', title: "Kim jesteśmy?", from: 5, to: 52 }],
  [2, { partNo: 2, type: 'video', subtype: 'pp', title: "Czym jest zespół MRKH i z czym się wiąże?", from: 52, to: 4 * 60 + 37 }],
  [3, { partNo: 3, type: 'video', subtype: 'pp', title: "Siedem rad dla Bezpestkowych", from: 4 * 60 + 37, to: 7 * 60 + 51 }],
  [4, { partNo: 4, type: 'video', subtype: 'pp', title: "Kluczowe punkty w życiu osób z zespołem MRKH", from: 7 * 60 + 51, to: 15 * 60 + 3 }],
  [5, { partNo: 5, type: 'video', subtype: 'pp', title: "Wnioski", from: 15 * 60 + 3, to: 16 * 60 + 11 }],
  [6, { partNo: 6, type: 'video', subtype: 'pp', title: "Raport dotyczący komunikacji lekarzy z pacjentami", from: 16 * 60 + 11, to: 18 * 60 + 19 }],
  [7, { partNo: 7, type: 'video', subtype: 'pp', title: "Dwie historie pacjentek z zespołem MRKH", from: 18 * 60 + 19, to: 21 * 60 + 46 }],
  [8, { partNo: 8, type: 'video', subtype: 'pp', title: "Wnioski", from: 21 * 60 + 46, to: 24 * 60 + 15 }],
  [9, { partNo: 9, type: 'video', subtype: 'pp', title: "Dlaczego istotnie jest słuchanie organizacji pacjenckich", from: 24 * 60 + 15, to: 24 * 60 + 57 }],
  [10, { partNo: 10, type: 'video', subtype: 'pl', title: "Czym jest zespół MRKH?", from: 24 * 60 + 57, to: 25 * 60 + 19 }],
  [11, { partNo: 11, type: 'video', subtype: 'pl', title: "Jak rozpoznać MRKH?", from: 25 * 60 + 19, to: 35 * 60 + 19 }],
  [12, { partNo: 12, type: 'video', subtype: 'pl', title: "W jaki sposób przekazywać diagnoze o zespole MRKH", from: 35 * 60 + 19, to: 48 * 60 + 51 }],
  [13, { partNo: 13, type: 'video', subtype: 'pl', title: "Z czym się wiąże MRKH?", from: 48 * 60 + 51, to: Infinity }],
]);

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

export const videoEntries = Array.from(videoSubchapters.entries());
export const perspektywaPacjencka = videoEntries.filter(([sub, value]) => sub < 9);
export const perspektywaLekarza = videoEntries.filter(([sub, value]) => sub > 9);

export const getId = (subchapter: Subchapter) => {
  return `${subchapter.type}#${subchapter.subtype}#${subchapter.partNo}`;
}

export const getChapterNo = (subchapter: Subchapter) => {
  if (subchapter.type === 'video') {
    return 1;
  }
  return 2;
}

export const getTitle = (subchapter: Subchapter) => {
  if (subchapter.type === 'video') {
    return `${subchapter.partNo}. ${subchapter.title}`;
  }
  return subchapter.title;
}

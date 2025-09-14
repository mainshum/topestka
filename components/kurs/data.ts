import {
  array,
  boolean,
  InferInput,
  literal,
  number,
  object,
  optional,
  string,
  union,
} from "valibot";

export type VideoSubchapter = {
  title: string;
  from: number;
  to: number;
};

export type OtherSubchapter = {
  title: string;
};

export type Subchapter = VideoSubchapter | OtherSubchapter;

export const emptyCompletedItems = {
  video: [],
  broszura_1: false,
  broszura_2: false,
  broszura_3: false,
  flashcard: false,
  quiz: false,
};

export const completedItemsSchema = optional(
  object({
    video: array(number()),
    broszura_1: boolean(),
    broszura_2: boolean(),
    broszura_3: boolean(),
    flashcard: boolean(),
    quiz: boolean(),
  }),
  emptyCompletedItems
);

export const chaptersEnum = union([literal("video"), literal("flashcard"), literal("quiz")]);

export type Chapter = InferInput<typeof chaptersEnum>;

export const videoSubchapters: VideoSubchapter[] = [
  { title: "Kim jesteśmy?", from: 5, to: 53 },
  {
    title: "Czym jest zespół MRKH i z czym się wiąże?",
    from: 53,
    to: 4 * 60 + 38,
  },
  {
    title: "Siedem rad dla Bezpestkowych",
    from: 4 * 60 + 38,
    to: 7 * 60 + 51,
  },
  {
    title: "Kluczowe punkty w życiu osób z zespołem MRKH",
    from: 7 * 60 + 51,
    to: 15 * 60 + 5,
  },
  { title: "Wnioski", from: 15 * 60 + 5, to: 16 * 60 + 11 },
  {
    title: "Raport dotyczący komunikacji lekarzy z pacjentami",
    from: 16 * 60 + 11,
    to: 18 * 60 + 19,
  },
  {
    title: "Dwie historie pacjentek z zespołem MRKH",
    from: 18 * 60 + 19,
    to: 21 * 60 + 48,
  },
  { title: "Wnioski", from: 21 * 60 + 48, to: 24 * 60 + 17 },
  {
    title: "Dlaczego istotnie jest słuchanie organizacji pacjenckich",
    from: 24 * 60 + 15,
    to: 24 * 60 + 57,
  },
  { title: "Czym jest zespół MRKH?", from: 24 * 60 + 57, to: 35 * 60 + 19 },
  { title: "Jak rozpoznać MRKH?", from: 35 * 60 + 19, to: 48 * 60 + 51 },
  {
    title: "W jaki sposób przekazywać diagnozę o zespole MRKH?",
    from: 48 * 60 + 51,
    to: 52 * 60 + 32,
  },
  { title: "Z czym się wiąże MRKH?", from: 52 * 60 + 32, to: Infinity },
];

export const chapters: Record<Chapter[number], { title: string; subchapters: Subchapter[] } > = {
  video: {
    title: "MRKH: perspektywa pacjencka",
    subchapters: videoSubchapters,
  },
  flashcard: {
    title: "Zestaw fiszek",
    subchapters: [
      {
        title:
          "Zapoznaj się z zestawem fiszek! Został stworzony przez dr Karinę Kapczuk w celu przeprowadzenia wspierającej rozmowy z rodzicami osób z zespołem MRKH.",
      },
    ],
  },
  quiz: {
    title: "Quiz wiedzy o MRKH",
    subchapters: [{ title: "Rozwiąż quiz, aby ukończyć kurs." }],
  },
};
export const flashcardData = [
  {
    flashcardNo: 1,
    textContent: "Zespół MRKH nie zagraża życiu Twojego dziecka.",
  },
  {
    flashcardNo: 2,
    textContent: "Nie obwiniaj się o to, że córka ma zespół MRKH.",
  },
  {
    flashcardNo: 3,
    textContent:
      "Uzgodnij z córką, z kim podzielić się informacją czyli komu możecie zaufać i na czyje wsparcie możecie liczyć. ",
  },
  {
    flashcardNo: 4,
    textContent:
      "Nie wywieraj presji w kwestii podjęcia leczenia wady pochwy. ",
  },
  {
    flashcardNo: 5,
    textContent:
      "Pamiętaj, że choć 4999 na 5000 kobiet ma macicę, to niepłodność jest problemem, który dotyczy co piątej pary. ",
  },
];

type VideoSubchapter = {
  type: 'video'
  subtype: 'pp' | 'pl';
  title: string;
  from: number;
  to: number;
}

type BroszuraSubchapter = {
  type: 'broszura';
  title: string;
}

export type Subchapter = VideoSubchapter | BroszuraSubchapter;

export const videoSubchapters = new Map<number, VideoSubchapter>([
  [1, { type: 'video', subtype: 'pp', title: "Kim jesteśmy?", from: 5, to: 52 }],
  [2, { type: 'video', subtype: 'pp', title: "Czym jest zespół MRKH i z czym się wiąże?", from: 52, to: 4 * 60 + 37 }],
  [3, { type: 'video', subtype: 'pp', title: "Siedem rad dla Bezpestkowych", from: 4 * 60 + 37, to: 7 * 60 + 51 }],
  [4, { type: 'video', subtype: 'pp', title: "Kluczowe punkty w życiu osób z zespołem MRKH", from: 7 * 60 + 51, to: 15 * 60 + 3 }],
  [5, { type: 'video', subtype: 'pp', title: "Wnioski", from: 15 * 60 + 3, to: 16 * 60 + 11 }],
  [6, { type: 'video', subtype: 'pp', title: "Raport dotyczący komunikacji lekarzy z pacjentami", from: 16 * 60 + 11, to: 18 * 60 + 19 }],
  [7, { type: 'video', subtype: 'pp', title: "Dwie historie pacjentek z zespołem MRKH", from: 18 * 60 + 19, to: 21 * 60 + 46 }],
  [8, { type: 'video', subtype: 'pp', title: "Wnioski", from: 21 * 60 + 46, to: 24 * 60 + 15 }],
  [9, { type: 'video', subtype: 'pp', title: "Dlaczego istotnie jest słuchanie organizacji pacjenckich", from: 24 * 60 + 15, to: 24 * 60 + 57 }],
  [10, { type: 'video', subtype: 'pl', title: "Czym jest zespół MRKH?", from: 24 * 60 + 57, to: 25 * 60 + 19 }],
  [11, { type: 'video', subtype: 'pl', title: "Jak rozpoznać MRKH?", from: 25 * 60 + 19, to: 35 * 60 + 19 }],
  [12, { type: 'video', subtype: 'pl', title: "W jaki sposób przekazywać diagnoze o zespole MRKH", from: 35 * 60 + 19, to: 48 * 60 + 51 }],
  [13, { type: 'video', subtype: 'pl', title: "Z czym się wiąże MRKH?", from: 48 * 60 + 51, to: Infinity }],
]);


export const videoEntries = Array.from(videoSubchapters.entries());
export const perspektywaPacjencka = videoEntries.filter(([sub, value]) => sub < 9);
export const perspektywaLekarza = videoEntries.filter(([sub, value]) => sub > 9);
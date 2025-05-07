import { Subchapter } from './context';

const timestampToMilliseconds = (timestamp: string) => {
  const [minutes, seconds] = timestamp.split(":").map(Number);
  return (minutes * 60 + seconds) * 1000;
};

export const allSubchapters: Subchapter[] = (() => {
  const allChapters = [
    [1, 1, "00:05", "Kim jesteśmy?", "video"],
    [1, 2, "00:52", "Czym jest zespół MRKH i z czym się wiąże?", "video"],
    [1, 3, "04:37", "Siedem rad dla Bezpestkowych", "video"],
    [1, 4, "07:51", "Kluczowe punkty w życiu osób z zespołem MRKH", "video"],
    [1, 5, "15:03", "Wnioski", "video"],
    [1, 6, "16:11", "Raport dotyczący komunikacji lekarzy z pacjentami", "video"],
    [1, 7, "18:19", "Dwie historie pacjentek z zespołem MRKH", "video"],
    [1, 8, "21:46", "Wnioski", "video"],
    [1, 9, "24:15", "Dlaczego istotnie jest słuchanie organizacji pacjenckich", "video"],
    [2, 1, "24:57", "Czym jest zespół MRKH?", "video"],
    [2, 2, "35:19", "Jak rozpoznać MRKH?", "video"],
    [2, 3, "48:51", "W jaki sposób przekazywać diagnoze o zespole MRKH", "video"],
    [2, 4, "52:31", "Z czym się wiąże MRKH?", "video"],
  ] as const;

  // First create base objects
  const subchapters = allChapters.map(([chapter, subchapter, timestamp, subchapterTitle, type]) => {
    return {
      chapter,
      subchapter,
      subchapterTitle,
      from: timestamp ? timestampToMilliseconds(timestamp) : 0,
      to: 0,
      type,
      getNext: () => null // Placeholder, will be updated
    } as Subchapter;
  });

  // Then update getNext functions with references to actual objects
  return subchapters.map((sc, i) => ({
    ...sc,
    getNext: () => subchapters[i + 1] || null,
    to: subchapters[i + 1]?.from || Infinity,
  }));
})(); 
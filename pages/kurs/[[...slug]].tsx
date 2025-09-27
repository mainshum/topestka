import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Mux from "@mux/mux-node";
import React, { useRef, useState } from "react";
import { Chapters } from '../../components/kurs/Chapters';
import dynamic from 'next/dynamic';
import { Chapter } from '../../components/kurs/Chapter';
import { emptyCompletedItems, VideoSubchapter, chapters, chaptersEnum } from '@/components/kurs/data';
import { Subchapter, Subchapter as SubchapterComponent, SubchapterDownloadableContent } from '../../components/kurs/Subchapter';
import { Flashcards } from '../../components/kurs/Flashcard';
import { QuizChapter } from "@/components/kurs/QuizChapter";
import Video from "@/components/kurs/Video";
import { useRouter } from "next/router";
import Link from "next/link";
import { InferOutput, safeParse } from "valibot";
import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from "@/server/routers/_app";
import { completedItemsSchema } from "@/components/kurs/data";
import { MarkCompleted } from "@/components/kurs/MarkCompleted";
import { cn } from "@/utils/misc";

import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });


const flashcardSubchapterDescription = "Wspierające hasła w rozmowie z rodzicami osób z zespołem MRKH";

const getCompletedPercentage = (total: number, completed: number) => {
  return Math.round((completed / total) * 100);
}

type GetServerSidePropsParams = {
  muxToken: string;
  completedItems: InferOutput<typeof completedItemsSchema>;
};

const playbackId = "SR34w8OYDqmeJB3S11msDqJCq7tx22H202Rtkd4UpfoY";

export const getServerSideProps: GetServerSideProps<GetServerSidePropsParams> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.hasAccess) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const mux = new Mux();

  const helpers = await createServerSideHelpers({
    router: appRouter,
    ctx: session
  })

  let baseOptions = {
    keyId: process.env.MUX_SIGNING_KEY,
    keySecret: process.env.MUX_PRIVATE_KEY,
    expiration: "7d",
  };

  const muxToken = await mux.jwt.signPlaybackId(playbackId, {
    ...baseOptions,
    type: "video",
  });

  const completedItems = await helpers.user.getCompletedItems.fetch();

  return {
    props: {
      muxToken,
      completedItems
    },
  };
};

// Main component
export default function Page({
  muxToken,
  // completedItems,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const router = useRouter();

  const chapterParsed = safeParse(chaptersEnum, router.query?.slug?.[0]);
  const chapter = chapterParsed.success ? chapterParsed.output : 'video';

  const subchapterFromQuery = Number(router.query?.slug?.[1]) || 1;

  const contentRef = useRef<HTMLDivElement>(null);

  const getFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const items = localStorage.getItem('completedItems');
      const itemsParsed = safeParse(completedItemsSchema, JSON.parse(items || '{}'));
      return itemsParsed.success ? itemsParsed.output : emptyCompletedItems;
    }
    return emptyCompletedItems;
  }

  const [completedItems, setCompletedItems] = useState<InferOutput<typeof completedItemsSchema>>(getFromLocalStorage());

  const handleSubchapterChange = (chapter: string, subchapter: number) => {
    // scroll entire document to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push(`/kurs/${chapter}/${subchapter}`, undefined, { shallow: true });
  }

  const handleMarkAsCompleted = () => {

    let newCompletedItems: InferOutput<typeof completedItemsSchema>;
    if (chapter === 'video') {
      if (completedItems.video.includes(subchapterFromQuery)) { return; }
      newCompletedItems = { ...completedItems, video: [...completedItems.video, subchapterFromQuery] };
    } else {
      newCompletedItems = { ...completedItems, [chapter as keyof typeof completedItems]: true };
    }
    setCompletedItems(newCompletedItems);
    localStorage.setItem('completedItems', JSON.stringify(newCompletedItems));
  }

  let { title, subchapters } = chapters[chapter as keyof typeof chapters];

  // hack 
  if (chapter === 'video' && subchapterFromQuery >= 10) {
    title = 'MRKH: perspektywa lekarza';
  }

  const completedPP = getCompletedPercentage(9, completedItems.video.filter((item) => item < 10).length);
  const completedPL = getCompletedPercentage(4, completedItems.video.filter((item) => item >= 10).length);
  const completedBroszury = (completedItems.broszura_1 ? 1 : 0) + (completedItems.broszura_2 ? 1 : 0);

  const handleBroszuraDownload = (broszuraFile: 'broszura_1' | 'broszura_2' | 'broszura_3') => {
    setCompletedItems({ ...completedItems, [broszuraFile]: true });
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
    window.open(`/bezpestkowe_${broszuraFile}.pdf`, '_blank');
  }

  return (
    <div ref={contentRef} className="flex flex-col w-full">
      <section className="basis-[120px] shrink-0">
        <Link href="/" className="top-4 left-4 font-monarcha text-xl">
          MRKH to pestka!
        </Link>
        <h1 className="pt-6 pb-1 font-outfit text-orange-500 text-lg">
          {title}
        </h1>
      </section>
      <section className="flex xl:flex-row flex-col justify-between gap-x-6 pt-2">
        <div className="relative flex flex-col justify-between items-start gap-6 grow-[1] bottom-11 self-start w-full">
          <h2 className="font-monarcha text-2xl text-eblue-600">{subchapters[subchapterFromQuery - 1]?.title}</h2>
          {chapter === 'video' && (
            <Video key={subchapterFromQuery} notifySubchatperPlaying={() => { }} muxToken={muxToken} playbackId={playbackId} startTime={(subchapters[subchapterFromQuery - 1] as VideoSubchapter)?.from || 0} />
          )}
          {chapter === 'flashcard' && (
            <>
              <Flashcards  />
            </>
          )}
          {chapter === 'quiz' && <QuizChapter />}
          <MarkCompleted className="self-center" markAsCompleted={handleMarkAsCompleted} />
        </div>
        <Chapters>
          <Chapter
            chapterNo={1}
            subchapterTitle={chapters.video.title}
            completed={completedPP}
          >
            {chapters.video.subchapters.slice(0, 9).map((sc, index) => {
              return (
                <SubchapterComponent
                  key={`${index}-${sc.title}`}
                  isCurrent={index + 1 === subchapterFromQuery}
                  done={completedItems.video.includes(index + 1)}
                  onClick={() => handleSubchapterChange('video', index + 1)}
                >
                  {`${index + 1}. ${sc.title}`}
                </SubchapterComponent>
              );
            })}
          </Chapter>
          <Chapter
            chapterNo={2}
            subchapterTitle="MRKH: perspektywa lekarza"
            completed={completedPL}
          >
            {chapters.video.subchapters.slice(9).map((sc, index) => {
              return (
                <SubchapterComponent
                  key={`${index}-${sc.title}`}
                  isCurrent={index + 10 === subchapterFromQuery}
                  done={completedItems.video.includes(index + 10)}
                  onClick={() => handleSubchapterChange('video', index + 10)}
                >
                  {`${index + 1}. ${sc.title}`}
                </SubchapterComponent>
              );
            })}
          </Chapter>
          <Chapter
            chapterNo={3}
            subchapterTitle="Podsumowanie badania - publikacja"
            completed={completedItems.broszura_3 ? 100 : 0}
          >
            <SubchapterComponent
              isCurrent={false}
              done={completedItems.broszura_3}
              className="items-center justify-between gap-2 flex"
              onClick={() => handleBroszuraDownload('broszura_3')}
            >
              <SubchapterDownloadableContent text="Publikacja, która stanowi podsumowanie badań przeprowadzonych przez Agatę Śmiałkowską na temat przygotowania osób studiujących kierunek lekarski do rozmów z pacjentami." />
            </SubchapterComponent>
          </Chapter>

          <Chapter
            chapterNo={4}
            subchapterTitle="Broszury"
            completed={getCompletedPercentage(2, completedBroszury)}
          >
            <Subchapter
              isCurrent={false}
              className="items-center justify-between gap-2 flex"
              done={completedItems.broszura_1}
              onClick={() => handleBroszuraDownload('broszura_1')}
            >
              <SubchapterDownloadableContent text="1. Zespół MRKH - o osobach, które nie mają pestki" />

            </Subchapter>
            <Subchapter
              isCurrent={false}
              className="items-center justify-between gap-2 flex"
              done={completedItems.broszura_2}
              onClick={() => handleBroszuraDownload('broszura_2')}
            >
              <SubchapterDownloadableContent text="2. O zespole MRKH, jego objawach i kwestiach z nim związanych" />
            </Subchapter>
          </Chapter>
          <Chapter
            chapterNo={5}
            subchapterTitle="Zestaw fiszek"
            completed={completedItems.flashcard ? 100 : 0}
            onClick={() => {
              handleSubchapterChange('flashcard', 1);
            }}
          >
            <Subchapter
              isCurrent={chapter === 'flashcard'}
              done={completedItems.flashcard}
              role="listitem"
            >
              {flashcardSubchapterDescription}
            </Subchapter>
          </Chapter>
          <Chapter
            chapterNo={6}
            subchapterTitle="Quiz wiedzy o zespole MRKH"
            completed={completedItems.quiz ? 100 : 0}
            onClick={() => {
              handleSubchapterChange('quiz', 1);
            }}
          >
            <SubchapterComponent
              role="listitem"
              isCurrent={chapter === 'quiz'}
              done={completedItems.quiz}
            >
              Czy potrafisz przeprowadzić rozmowę z osobą z zespołem MRKH?
            </SubchapterComponent>
          </Chapter>
        </Chapters>
      </section>
    </div>
  );
}



Page.getLayout = (page: React.ReactNode) => (
  <main className={cn(outfit.variable, "flex justify-center px-10 py-16 min-h-dvh")}>{page}</main>
);
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Mux from "@mux/mux-node";
import React, { } from "react";
import { getCompletedItems } from "@/utils/completedItems/server";
import { Chapters } from '../../components/kurs/Chapters';
import dynamic from 'next/dynamic';
import { Chapter } from '../../components/kurs/Chapter';
import { flashcardData, chapters } from '../../components/kurs/data';
import { Subchapter, Subchapter as SubchapterComponent } from '../../components/kurs/Subchapter';
import { Flashcards } from '../../components/kurs/Flashcard';
import { QuizChapter } from "@/components/kurs/QuizChapter";
import Video from "@/components/kurs/Video";
import { useRouter } from "next/router";
import Link from "next/link";


const flashcardSubchapterDescription = "Zapoznaj się z zestawem fiszek! Został stworzony przez dr Karinę Kapczuk w celu przeprowadzenia wspierającej rozmowy z rodzicami osób z zespołem MRKH.";

const getCompletedPercentage = (total: number, completed: number) => {
  return Math.round((completed / total) * 100);
}

const BroszuraContent = dynamic(() => import('../../components/kurs/Broszura'), {
  ssr: false,
});

type GetServerSidePropsParams = {
  muxToken: string;
  initialCompletedSubchapters: string[];
};

const playbackId = "SR34w8OYDqmeJB3S11msDqJCq7tx22H202Rtkd4UpfoY";

export const getServerSideProps: GetServerSideProps<GetServerSidePropsParams> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  console.log('getServerSideProps');

  if (!session?.user?.hasAccess) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const mux = new Mux();

  let baseOptions = {
    keyId: process.env.MUX_SIGNING_KEY,
    keySecret: process.env.MUX_PRIVATE_KEY,
    expiration: "7d",
  };

  const muxToken = await mux.jwt.signPlaybackId(playbackId, {
    ...baseOptions,
    type: "video",
  });

  // todo: trpc
  const completedSubchapters = await getCompletedItems(
    context.req,
    context.res,
    "completedSubchapters"
  );

  return {
    props: {
      muxToken,
      initialCompletedSubchapters: completedSubchapters,
    },
  };
};

// Main component
export default function Page({
  muxToken,
  initialCompletedSubchapters,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const router = useRouter();

  // todo fix done
  console.log(initialCompletedSubchapters);

  const chapter = router.query?.slug?.[0] || 'video';
  const subchapter = Number(router.query?.slug?.[1]) || 1;

  const handleSubchapterChange = (chapter: string, subchapter: number) => {
    router.replace(`/kurs/${chapter}/${subchapter}`, undefined, { shallow: true });
  }


  const {title, subchapters} = chapters[chapter as keyof typeof chapters];

  return (
    <div className="flex flex-col w-full">
      <section className="basis-[120px] shrink-0">
        <Link href="/kurs/video/1" className="top-4 left-4 font-monarcha text-xl">
          MRKH to pestka!
        </Link>
        <h1 className="pt-6 pb-1 font-outfit text-orange-500 text-lg">
          {title}
        </h1>
      </section>
      <section className="flex xl:flex-row flex-col justify-between gap-x-6 pt-2">
        <div className="relative flex flex-col justify-between items-start gap-6 grow-[1] bottom-11 self-start">
          <h2 className="font-monarcha text-2xl text-eblue-600">{subchapters[subchapter - 1]?.title}</h2>
          {chapter === 'video' && (
            <Video subchapter={subchapter} onSubchapterChange={(subchapter) => { }} muxToken={muxToken} playbackId={playbackId} />
          )}
          {chapter === 'badanie' && (
            <BroszuraContent iframeSrc="/bezpestkowe_broszura_3.pdf" />
          )}
          {chapter === 'broszura' && (
            <BroszuraContent iframeSrc={`/bezpestkowe_broszura_${subchapter}.pdf`} />
          )}
          {chapter === 'flashcard' && (
            <>
              <Flashcards data={flashcardData} />
            </>
          )}
          {chapter === 'quiz' && <QuizChapter />}
          {/* <MarkCompleted markAsCompleted={() => { }} currentSubchapterId={subchapter.toString()} /> */}
        </div>
        <Chapters>
          <Chapter
            chapterNo={1}
            subchapterTitle={chapters.video.title}
            completed={chapters.video.subchapters.length}
          >
            {chapters.video.subchapters.slice(0, 9).map((sc, index) => {
              return (
                <SubchapterComponent
                  key={`${index}-${sc.title}`}
                  isCurrent={index + 1 === subchapter}
                  done={false}
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
            completed={10}
          >
            {chapters.video.subchapters.slice(9).map((sc, index) => {
              return (
                <SubchapterComponent
                  key={`${index}-${sc.title}`}
                  isCurrent={index + 10 === subchapter}
                  done={false}
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
            completed={chapters.badanie.subchapters.length}
            onClick={() => handleSubchapterChange('badanie', 1)}
          >
            <SubchapterComponent
              isCurrent={chapter === 'badanie'}
              done={false}
              onClick={() => {
                handleSubchapterChange('badanie', 1);
              }}
            >
              Publikacja, która stanowi podsumowanie badań przeprowadzonych przez Agatę Śmiałkowską na temat przygotowania osób studiujących kierunek lekarski do rozmów z pacjentami.
            </SubchapterComponent>
          </Chapter>

          <Chapter
            chapterNo={5}
            subchapterTitle="Broszury"
            completed={chapters.broszura.subchapters.length}
          >
            <Subchapter
              isCurrent={chapter === 'broszura' && subchapter === 1}
              done={false}
              onClick={() => {
                handleSubchapterChange('broszura', 1);
              }}
            >
              1. Zespół MRKH - o osobach, które nie mają pestki
            </Subchapter>
            <Subchapter
              isCurrent={chapter === 'broszura' && subchapter === 2}
              done={false}
              onClick={() => {
                handleSubchapterChange('broszura', 2);
              }}
            >
              2. O zespole MRKH, jego objawach i kwestiach z nim związanych
            </Subchapter>
          </Chapter>
          <Chapter
            chapterNo={4}
            subchapterTitle="Zestaw fiszek"
            completed={chapters.flashcard.subchapters.length}
            onClick={() => {
              handleSubchapterChange('flashcard', 1);
            }}
          >
            <Subchapter
              isCurrent={chapter === 'flashcard' && subchapter === 1}
              done={false}
              onClick={() => {
                handleSubchapterChange('flashcard', 1);
              }}
            >
              {flashcardSubchapterDescription}
            </Subchapter>
          </Chapter>
          <Chapter
            chapterNo={6}
            subchapterTitle="Quiz wiedzy o MRKH"
            completed={chapters.quiz.subchapters.length}
            onClick={() => {
              handleSubchapterChange('quiz', 1);
            }}
          >
            <SubchapterComponent
              isCurrent={chapter === 'quiz'}
              done={false}
              onClick={() => {
                handleSubchapterChange('quiz', 1);
              }}
            >
              Rozwiąż quiz, aby ukończyć kurs.
            </SubchapterComponent>
          </Chapter>
        </Chapters>
      </section>
    </div>
  );
}

Page.getLayout = (page: React.ReactNode) => (
  <main className="flex justify-center px-10 py-16 h-dvh">{page}</main>
);
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Mux from "@mux/mux-node";
import React, { } from "react";
import { getCompletedItems } from "@/utils/completedItems/server";
import { Title } from '../../components/kurs/Title';
import { Chapters } from '../../components/kurs/Chapters';
import dynamic from 'next/dynamic';
import { Chapter } from '../../components/kurs/Chapter';
import { perspektywaLekarza, perspektywaPacjencka, flashcardData } from '../../components/kurs/data';
import { KursProvider } from '../../components/kurs/context';
import { Subchapter, Subchapter as SubchapterComponent } from '../../components/kurs/Subchapter';
import { Flashcards } from '../../components/kurs/Flashcard';
import { Button } from '../../components/Button';
import { QuizChapter } from "@/components/kurs/QuizChapter";
import Video from "@/components/kurs/Video";
import router, { useRouter } from "next/router";
import { MarkCompleted } from "@/components/kurs/MarkCompleted";
import { ParsedUrlQuery } from "querystring";


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

const mux = new Mux();
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

  const completedVideoPP = 0;
  const completedVideoPL = 0;
  const completedBroszura = 0;
  const completedFlashcard = 0;

  const handleSubchapterChange = (chapter: string, subchapter: number) => {
    router.replace(`/kurs/${chapter}/${subchapter}`, undefined, { shallow: true });
  }

  return (
    <div className="flex flex-col w-full">
      <Title />
      <section className="flex xl:flex-row flex-col justify-between gap-x-6 pt-2">
        <div className="relative flex flex-col justify-between items-start gap-6 grow-[1]">
          {chapter === 'video' && (
            <Video subchapter={subchapter} onSubchapterChange={(subchapter) => handleSubchapterChange('video', subchapter)} muxToken={muxToken} playbackId={playbackId} />
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
          <MarkCompleted markAsCompleted={() => { }} currentSubchapterId={subchapter.toString()} />
        </div>
        <Chapters>
          <Chapter
            chapterNo={1}
            subchapterTitle="MRKH: perspektywa pacjencka"
            totalSubchapters={perspektywaPacjencka.length}
            completed={getCompletedPercentage(perspektywaPacjencka.length, completedVideoPP)}
          >
            {perspektywaPacjencka.map(([sub, sc]) => {
              return (
                <SubchapterComponent
                  key={`${sub}-${sc.title}`}
                  isCurrent={sc.partNo === subchapter}
                  done={false}
                  onClick={() => handleSubchapterChange('video', sc.partNo)}
                >
                  {`${sc.partNo}. ${sc.title}`}
                </SubchapterComponent>
              );
            })}
          </Chapter>
          <Chapter
            chapterNo={2}
            subchapterTitle="MRKH: perspektywa lekarza"
            totalSubchapters={perspektywaLekarza.length}
            completed={getCompletedPercentage(perspektywaLekarza.length, completedVideoPL)}
          >
            {perspektywaLekarza.map(([sub, sc]) => {
              return (
                <SubchapterComponent
                  key={`${sub}-${sc.title}`}
                  isCurrent={sc.partNo === subchapter}
                  done={false}
                  onClick={() => handleSubchapterChange('video', sc.partNo)}
                >
                  {`${sc.partNo}. ${sc.title}`}
                </SubchapterComponent>
              );
            })}
          </Chapter>
          <Chapter
            chapterNo={3}
            subchapterTitle="Podsumowanie badania - publikacja"
            totalSubchapters={1}
            completed={0}
            onClick={() => { }}
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
            totalSubchapters={2}
            completed={getCompletedPercentage(2, completedBroszura)}
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
            totalSubchapters={1}
            completed={getCompletedPercentage(1, completedFlashcard)}
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
            totalSubchapters={1}
            completed={0}
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
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Mux from "@mux/mux-node";
import React, { HTMLAttributes, useCallback, useRef } from "react";
import { cn } from "@/utils/misc";
import { getCompletedItems } from "@/utils/completedItems/server";
import { Title } from '../../components/kurs/Title';
import { Chapters } from '../../components/kurs/Chapters';
import { BroszuraChapter } from '../../components/kurs/BroszuraChapter';
import { FlashcardChapter } from '../../components/kurs/FlashcardChapter';
import dynamic from 'next/dynamic';
import Video from '../../components/kurs/Video';
import { Chapter } from '../../components/kurs/Chapter';
import { getId, perspektywaLekarza, perspektywaPacjencka, videoEntries, type Subchapter, flashcardData } from '../../components/kurs/data';
import { KursProvider, useKurs } from '../../components/kurs/context';
import { flushSync } from 'react-dom';
import { Subchapter as SubchapterComponent } from '../../components/kurs/Subchapter';
import { Flashcard } from '../../components/kurs/Flashcard';
import { Button } from '../../components/Button';

const getCompletedPercentage = (total: number, completed: number) => {
  return Math.round((completed / total) * 100);
}

const BroszuraContent = dynamic(() => import('../../components/kurs/Broszura'), {
  ssr: false,
});

type GetServerSidePropsParams = {
  muxToken: string;
  playbackId: string;
  initialCompletedSubchapters: string[];
};

export const getServerSideProps: GetServerSideProps<GetServerSidePropsParams> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.hasAccess) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const mux = new Mux();

  const playbackId = "SR34w8OYDqmeJB3S11msDqJCq7tx22H202Rtkd4UpfoY";

  let baseOptions = {
    keyId: process.env.MUX_SIGNING_KEY,
    keySecret: process.env.MUX_PRIVATE_KEY,
    expiration: "7d",
  };

  const muxToken = await mux.jwt.signPlaybackId(playbackId, {
    ...baseOptions,
    type: "video",
  });

  const completedSubchapters = await getCompletedItems(
    context.req,
    context.res,
    "completedSubchapters"
  );

  return {
    props: {
      muxToken,
      playbackId,
      initialCompletedSubchapters: completedSubchapters,
    },
  };
};

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <KursProvider initialCompletedSubchapters={props.initialCompletedSubchapters}>
      <div className="flex flex-col w-full">
        <KursPage {...props} />
      </div>
    </KursProvider>
  );
}

const subchapterFromTime = (time: number) => {
  const match = videoEntries.find(([_sub, current]) => {
    if (time >= current.from && time < current.to) {
      return true;
    }
  })

  return match?.[1];
}

// Main component
function KursPage({
  muxToken,
  playbackId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { currentSubchapter, setCurrentSubchapter, isCompleted, completedSubchapters, markAsCompleted, currentSubchapterId } = useKurs();

  const videoRef = useRef<HTMLVideoElement | null>(null);


  const setVideoTime = (time: number) => {
    const subchapter = subchapterFromTime(time);
    if (!subchapter) return;

    flushSync(() => {
      setCurrentSubchapter(subchapter);
    })

    if (!videoRef.current || typeof videoRef.current === 'function') return;
    // set current time
    videoRef.current.currentTime = time;
  }

  const onVideoMount = useCallback((ref: HTMLVideoElement | null) => {
    if (!ref) return;
    if (currentSubchapter.type !== 'video') {
      throw new Error('Current subchapter is not a video');
    }

    videoRef.current = ref;
    ref.currentTime = currentSubchapter.from;

    ref.addEventListener('timeupdate', () => {
      const subchapter = subchapterFromTime(ref.currentTime);
      if (!subchapter) return;
      setCurrentSubchapter(subchapter);
    })
  }, [setCurrentSubchapter, currentSubchapter]);


  const { partNo, type, subtype } = currentSubchapter;

  console.log(type, subtype)


  const completedVideoPP = completedSubchapters.filter((item) => item.startsWith(`video#pp`)).length;
  const completedVideoPL = completedSubchapters.filter((item) => item.startsWith(`video#pl`)).length;
  const completedBroszura = completedSubchapters.filter((item) => item.startsWith(`broszura`)).length;
  const completedFlashcard = completedSubchapters.filter((item) => item.startsWith(`flashcard`)).length;

  // Determine if we should show the flashcard background
  const showFlashcardBackground = type === 'flashcard';

  return (
    <>
      <Title />
      <section className="flex xl:flex-row flex-col justify-between gap-x-6 pt-2">
        <div 
          className={cn(
            "relative flex flex-col justify-between items-start gap-6 grow-[1]",
          )}
        >
          {type === 'video' && (
            <Video ref={onVideoMount} muxToken={muxToken} playbackId={playbackId} />
          )}
          {type === 'broszura' && (
            <BroszuraContent iframeSrc={`/bezpestkowe_broszura_${partNo}.pdf`} />
          )}
          {type === 'flashcard' && (
            <div className="flex flex-col justify-between items-start gap-6 w-full ">
              <Flashcard data={flashcardData} />
              <Button
                className="px-6 border border-eblue-600 rounded-md"
                variant="ghost"
                size="sm"
                onClick={() => markAsCompleted(currentSubchapterId)}
              >
                Oznacz jako lekcję zakończoną
              </Button>
            </div>
          )}
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
                  isCurrent={sc === currentSubchapter}
                  done={isCompleted(getId(sc))}
                  onClick={() => setVideoTime(sc.from)}
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
                  isCurrent={sc === currentSubchapter}
                  done={isCompleted(getId(sc))}
                  onClick={() => setVideoTime(sc.from)}
                >
                  {`${sc.partNo}. ${sc.title}`}
                </SubchapterComponent>
              );
            })}
          </Chapter>
          <BroszuraChapter completed={getCompletedPercentage(2, completedBroszura)} />
          <FlashcardChapter completed={getCompletedPercentage(1, completedFlashcard)} />
        </Chapters>
      </section>
    </>
  );
}

Page.getLayout = (page: React.ReactNode) => (
  <main className="flex justify-center px-10 py-16 h-dvh">{page}</main>
);
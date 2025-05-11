import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Mux from "@mux/mux-node";
import React, { HTMLAttributes, useCallback, useRef } from "react";
import { cn } from "@/utils/misc";
import { getCompletedItems } from "@/utils/completedItems/server";
import { Title } from './components/Title';
import { Chapters } from './components/Chapters';
import { BroszuraChapter } from './components/Chapters/BroszuraChapter';
import dynamic from 'next/dynamic';
import Video from './video';
import { Chapter } from './components/Chapters/Chapter';
import { perspektywaLekarza, perspektywaPacjencka, videoEntries, type Subchapter } from './data';
import { KursProvider, useKurs } from './context';
import { flushSync } from 'react-dom';

const BroszuraContent = dynamic(() => import('./broszura'), {
  ssr: false,
});

// Subchapter component
type SubchapterProps = HTMLAttributes<HTMLLIElement> & {
  isCurrent: boolean;
  done: boolean;
};

const ActiveSubchapter = React.forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
  ({ className, ...rest }) => {
    return (
      <li
        className={cn(
          "cursor-pointer w-[220px] text-orange-500 flex gap-1 justify-between items-center text-sm font-medium",
          className
        )}
        {...rest}
      />
    );
  }
);

ActiveSubchapter.displayName = "ActiveSubchapter";

const Subchapter = React.forwardRef<HTMLLIElement, SubchapterProps>(
  ({ className, done, isCurrent, ...rest }) => {
    const style = cn(
      done ? "opacity-50" : "opacity-100",
      isCurrent ? "text-orange-500" : "text-eblue-500"
    );
    return (
      <ActiveSubchapter className={cn(style, className)} {...rest} />
    );
  }
);

Subchapter.displayName = "Subchapter";

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

  const {currentSubchapter, setCurrentSubchapter} = useKurs();

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
  }, []);

  return (
    <>
      <Title />
      <section className="flex xl:flex-row flex-col justify-between gap-x-6">
        <div className="relative flex flex-col justify-between items-start gap-6 grow-[1]">
          {currentSubchapter.type === 'video' && (
            <Video ref={onVideoMount} muxToken={muxToken} playbackId={playbackId} />
          )}
          {currentSubchapter.type === 'broszura' && (
            <BroszuraContent iframeSrc={'/bezpestkowe_broszura.pdf'} />
          )}
        </div>
        <Chapters>
          <Chapter
            chapterNo={1}
            subchapterTitle="MRKH: perspektywa pacjencka"
            totalSubchapters={perspektywaPacjencka.length}
          >
            {perspektywaPacjencka.map(([sub, sc]) => {
              return (
                <Subchapter
                  key={`${sub}-${sc.title}`}
                  isCurrent={sc.title === currentSubchapter.title}
                  done={false}
                  onClick={() => setVideoTime(sc.from)}
                >
                  {`${sc.partNo}. ${sc.title}`}
                </Subchapter>
              );
            })}
          </Chapter>
          <Chapter
            chapterNo={2}
            subchapterTitle="MRKH: perspektywa lekarza"
            totalSubchapters={perspektywaLekarza.length}
          >
            {perspektywaLekarza.map(([sub, sc]) => {
              return (
                <Subchapter
                  key={`${sub}-${sc.title}`}
                  isCurrent={sc.title === currentSubchapter.title}
                  done={false}
                  onClick={() => setVideoTime(sc.from)}
                >
                  {`${sc.partNo}. ${sc.title}`}
                </Subchapter>
              );
            })}
          </Chapter>
          <BroszuraChapter />
        </Chapters>
      </section>
    </>
  );
}

Page.getLayout = (page: React.ReactNode) => (
  <main className="flex justify-center px-10 py-16 h-dvh">{page}</main>
);
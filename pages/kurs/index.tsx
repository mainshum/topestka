import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Mux from "@mux/mux-node";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import React, { HTMLAttributes, useMemo } from "react";
import { cn } from "@/utils/misc";
import { getCompletedItems } from "@/utils/completedItems/server";
import { Root } from './components/Root';
import { Title } from './components/Title';
import { Chapters } from './components/Chapters';
import { VideoChapters } from './components/Chapters/VideoChapters';
import { BroszuraChapter } from './components/Chapters/BroszuraChapter';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const VideoContent = dynamic(() => import('./video'), {
  ssr: false,
});

const BroszuraContent = dynamic(() => import('./broszura'), {
  ssr: false,
});

type Subchapter = {
  from: number;
  to: number;
  chapter: number;
  subchapter: number;
  subchapterTitle: string;
  getNext: () => Subchapter | null;
}

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

// Enhanced LoadCircle component
const LoadCircle = ({ completionPercent }: { completionPercent: number }) => (
  <div className="relative rounded-full w-10 h-10">
    <svg viewBox="0 0 100 100" className="overflow-visible">
      <text
        textAnchor="middle"
        x="52%"
        y="60%"
        className="font-monarcha text-eblue-800 text-2xl"
      >
        {completionPercent}%
      </text>
      <circle
        cx="50"
        cy="50"
        r="45"
        strokeWidth="20"
        fill="none"
        stroke="#B4C0EE"
        strokeDasharray={`${completionPercent * 2.83} ${283}`}
        className="opacity-80"
        transform="rotate(-90 50 50)"
      />
    </svg>
  </div>
);

// Enhanced Chapter Item component
const Item = ({
  chapterNo,
  subchapterTitle,
  children,
  completedItems,
  totalSubchapters,
}: {
  chapterNo: number;
  subchapterTitle: string;
  children: React.ReactNode;
  completedItems: string[];
  totalSubchapters: number;
}) => {
  // Calculate completion percentage for this chapter
  const completionPercent = useMemo(() => {
    const completedCount = completedItems.filter((item) =>
      item.startsWith(`${chapterNo}.`)
    ).length;

    return totalSubchapters > 0
      ? Math.round((completedCount / totalSubchapters) * 100)
      : 0;
  }, [completedItems, chapterNo, totalSubchapters]);

  return (
    <li>
      <AccordionItem value={`chapter-${chapterNo}`}>
        <AccordionTrigger className="flex items-center gap-4 px-0 pt-3 pb-2 border-eblue-400 border-b-[1px] text-nowrap">
          <div className="flex gap-2">
            <LoadCircle completionPercent={completionPercent} />
            <div className="flex flex-col">
              <h1 className="font-outfit text-sm">Część {chapterNo}</h1>
              <h2 className="font-monarcha text-base">{subchapterTitle}</h2>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent asChild className="pb-0">
          <ol className="flex flex-col items-center pt-2">{children}</ol>
        </AccordionContent>
      </AccordionItem>
    </li>
  );
};


// Server-side props

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

// Main component
export default function KursPage({
  muxToken,
  playbackId,
  initialCompletedSubchapters = [],
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { view = 'video' } = router.query;

  return (
    <Root initialCompletedSubchapters={initialCompletedSubchapters}>
      <Title />
      <section className="flex xl:flex-row flex-col justify-between gap-x-6 xl:h-[calc(100%-160px)]">
        <div className="relative flex flex-col justify-between items-start gap-6">
          {!view && (
            <div className="w-full h-[600px] flex items-center justify-center text-eblue-500">
              Wybierz lekcję z menu po prawej stronie
            </div>
          )}
          {view === 'video' && (
            <VideoContent muxToken={muxToken} playbackId={playbackId} />
          )}
          {view === 'broszura' && (
            <BroszuraContent />
          )}
        </div>
        <Chapters>
          <VideoChapters />
          <BroszuraChapter />
        </Chapters>
      </section>
    </Root>
  );
}

KursPage.getLayout = (page: React.ReactNode) => (
  <main className="flex justify-center px-10 py-16 h-dvh">{page}</main>
);

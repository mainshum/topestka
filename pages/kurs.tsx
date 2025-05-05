import { getServerSession } from "next-auth";
import Video from "next-video";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Mux from "@mux/mux-node";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import React, { HTMLAttributes, useEffect, useState, useMemo } from "react";
import { cn } from "@/utils/misc";
import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useCompletedItems } from "@/utils/completedItems";
import { getCompletedItems } from "@/utils/completedItems/server";
import { fromTheme } from "tailwind-merge";

// Constants
const COMPLETED_SUBCHAPTERS_KEY = "topestka_completed_subchapters";

const timestampToMilliseconds = (timestamp: string) => {
  const [minutes, seconds] = timestamp.split(":").map(Number);
  return (minutes * 60 + seconds) * 1000;
};

type Subchapter = {
  from: number;
  to: number;
  chapter: number;
  subchapter: number;
  subchapterTitle: string;
  getNext: () => Subchapter | null;
}

const allSubchapters: Subchapter[] = (() => {
  const allChapters = [
    [1, 1, "00:05", "Kim jesteśmy?"],
    [1, 2, "00:52", "Czym jest zespół MRKH i z czym się wiąże?"],
    [1, 3, "04:37", "Siedem rad dla Bezpestkowych"],
    [1, 4, "07:51", "Kluczowe punkty w życiu osób z zespołem MRKH"],
    [1, 5, "15:03", "Wnioski"],
    [1, 6, "16:11", "Raport dotyczący komunikacji lekarzy z pacjentami "],
    [1, 7, "18:19", "Dwie historie pacjentek z zespołem MRKH"],
    [1, 8, "21:46", "Wnioski"],
    [1, 9, "24:15", "Dlaczego istotnie jest słuchanie organizacji pacjenckich"],
    [2, 1, "24:57", "Czym jest zespół MRKH?"],
    [2, 2, "35:19", "Jak rozpoznać MRKH?"],
    [2, 3, "48:51", "W jaki sposób przekazywać diagnoze o zespole MRKH"],
    [2, 4, "52:31", "Z czym się wiąże MRKH?"],
  ] as const;

  // First create base objects
  const subchapters = allChapters.map(([chapter, subchapter, timestamp, subchapterTitle]) => {
    return {
      chapter,
      subchapter,
      subchapterTitle,
      from: timestampToMilliseconds(timestamp),
      to: 0,
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

// Generate chapter.subchapter IDs for completed items
const getSubchapterId = (sc: Subchapter) =>
  `${sc.chapter}.${sc.subchapter}`;

// Subchapter component
type SubchapterProps = HTMLAttributes<HTMLLIElement> & {
  isCurrent: boolean;
  done: boolean;
};

const Subchapter = React.forwardRef<HTMLLIElement, SubchapterProps>(
  ({ className, done, isCurrent, ...rest }) => {
    const style = cn(
      done ? "opacity-50" : "opacity-100",
      isCurrent ? "text-orange-500" : "text-eblue-500"
    );
    return (
      <li
        className={cn(
          "cursor-pointer w-[220px] flex gap-1 justify-between items-center text-sm text-eblue-600 font-medium",
          style,
          className
        )}
        {...rest}
      />
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

const Chapter = {
  Item,
  Subchapter,
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

  const playbackId = "SR34w8OYDqmeJB3S11msDqJCq7tx22H202Rtkd4UpfoY"; // Enter your signed playback id here

  let baseOptions = {
    keyId: process.env.MUX_SIGNING_KEY,
    keySecret: process.env.MUX_PRIVATE_KEY,
    expiration: "7d", // E.g 60, "2 days", "10h", "7d", numeric value interpreted as seconds
  };

  const muxToken = await mux.jwt.signPlaybackId(playbackId, {
    ...baseOptions,
    type: "video",
  });

  // Fetch completed subchapters for the user if authenticated
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
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const [currentSubchapter, setCurrentSubchapter] = useState<Subchapter>(allSubchapters[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Use our custom hook for managing completed items
  const {
    items: completedSubchapters,
    isCompleted,
    markAsCompleted,
  } = useCompletedItems(
    "completedSubchapters",
    COMPLETED_SUBCHAPTERS_KEY,
    initialCompletedSubchapters
  );

  // Handler for time selection and loading indicator
  const onTimeSelect = (sc: Subchapter) => {
    if (!videoRef.current) return;
    // Set loading state
    setIsLoading(true);

    // Set current chapter and subchapter
    // setCurrentSubchapter(sc);

    // Update video time
    videoRef.current.currentTime = sc.from / 1000;

    // Clear loading state when video starts playing
    const handlePlaying = () => {
      setIsLoading(false);
      videoRef.current?.removeEventListener("playing", handlePlaying);
    };

    // Add event listener for when video starts playing
    videoRef.current.addEventListener("playing", handlePlaying);

    // Add a timeout to clear loading state in case the event doesn't fire
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Start playing the video
    videoRef.current.play().catch(() => {
      setIsLoading(false);
    });
  };

  // Handler for marking current lesson as completed
  const handleMarkAsCompleted = () => {
    markAsCompleted(getSubchapterId(currentSubchapter!));
    const nextSubchapter = currentSubchapter!.getNext();
    console.log(nextSubchapter);
    if (!nextSubchapter) return;
    onTimeSelect(nextSubchapter);
  };


  const onVideoReady = React.useCallback((el: HTMLVideoElement) => {
    if (!el) return;

    videoRef.current = el;

    el.addEventListener("timeupdate", () => {
      const ms = el.currentTime * 1000; // currentTime is in seconds, convert to ms
      const match = allSubchapters.find(({ from, to }) => ms >= from && ms <= to);
      const matchWithFallback = match ?? allSubchapters[0];
      setCurrentSubchapter(matchWithFallback);
    });
  }, []);

  const perspektywaPacjencka = allSubchapters.slice(0, 9);
  const perspektywaLekarza = allSubchapters.slice(9);

  const isPerspektywaPacjencka = perspektywaPacjencka.includes(currentSubchapter!);

  const makeSubchapterTitle = (sc: Subchapter) => `${sc.subchapter}: ${sc.subchapterTitle}`;

  const chapterTitle = `Część ${currentSubchapter!.chapter}: ${isPerspektywaPacjencka ? "Perspektywa pacjencka" : "Perspektywa lekarza"}`;
  const subchapterTitle = `${currentSubchapter.chapter}.${makeSubchapterTitle(currentSubchapter!)}`;

  return (
    <div className="flex flex-col w-full">
      <section className="basis-[120px] shrink-0">
        <Link href="/kurs" className="top-4 left-4 font-monarcha text-xl">
          MRKH to pestka!
        </Link>
        <h1 className="pt-5 font-monarcha text-orange-500 text-lg">
          {chapterTitle}
        </h1>
        <h2 className="font-monarcha text-2xl">{subchapterTitle}</h2>
      </section>
      <section className="flex xl:flex-row flex-col justify-between gap-x-6 xl:h-[calc(100%-160px)]">
        <div className="relative flex flex-col justify-between items-start gap-6">
          <Video
            ref={onVideoReady}
            playbackToken={muxToken}
            playbackId={playbackId}
            className="h-full"
          />
          {/* Loading indicator overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          )}
          <Button
            className="px-6 border border-eblue-600 rounded-md"
            variant="ghost"
            size={"sm"}
            onClick={handleMarkAsCompleted}
          >
            Oznacz jako lekcję zakończoną
          </Button>
        </div>
        <Accordion asChild type="single" collapsible>
          <ol className="grow-[1] basis-[300px]">
            <Chapter.Item
              chapterNo={1}
              subchapterTitle="MRKH: perspektywa pacjencka"
              completedItems={completedSubchapters}
              totalSubchapters={perspektywaPacjencka.length}
            >
              {perspektywaPacjencka.map((sc) => {
                const title = makeSubchapterTitle(sc);
                return (
                  (
                    <Chapter.Subchapter
                      key={`${sc.chapter}.${title}`}
                      isCurrent={sc === currentSubchapter}
                      done={isCompleted(getSubchapterId(sc))}
                      onClick={() => onTimeSelect(sc)}
                    >
                      <span>{title}</span>
                      <Check className="w-4 h-4 text-white" />
                    </Chapter.Subchapter>
                  )
                )
              })}
            </Chapter.Item>
            <Chapter.Item
              chapterNo={2}
              subchapterTitle="MRKH: perspektywa lekarza"
              completedItems={completedSubchapters}
              totalSubchapters={perspektywaLekarza.length}
            >
              {perspektywaLekarza.map((sc) => {
                const title = makeSubchapterTitle(sc);
                return (
                  (
                    <Chapter.Subchapter
                      key={`${sc.chapter}.${title}`}
                      isCurrent={sc === currentSubchapter}
                      done={isCompleted(getSubchapterId(sc))}
                      onClick={() => onTimeSelect(sc)}
                    >
                      <span>{title}</span>
                      <Check className="w-4 h-4 text-white" />
                    </Chapter.Subchapter>
                  )
                )
              })}
            </Chapter.Item>
          </ol>
        </Accordion>
      </section>
    </div>
  );
}

KursPage.getLayout = (page: React.ReactNode) => (
  <main className="flex justify-center px-10 py-16 h-dvh">{page}</main>
);

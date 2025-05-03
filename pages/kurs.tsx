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

// Constants
const COMPLETED_SUBCHAPTERS_KEY = "topestka_completed_subchapters";

const perspetkywaPacjenta = [
  ["00:05", "1. Kim jesteśmy?"],
  ["00:52", "2. Czym jest zespół MRKH i z czym się wiąże?"],
  ["04:37", "3. Siedem rad dla Bezpestkowych"],
  ["07:51", "4. Kluczowe punkty w życiu osób z zespołem MRKH"],
  ["15:03", "5. Wnioski"],
  ["16:11", "6. Raport dotyczący komunikacji lekarzy z pacjentami "],
  ["18:19", "7. Dwie historie pacjentek z zespołem MRKH"],
  ["21:46", "8. Wnioski"],
  ["24:15", "9. Dlaczego istotnie jest słuchanie organizacji pacjenckich"],
] as const;

const perspektywaLekarska = [
  ["24:57", "Czym jest zespół MRKH?"],
  ["35:19", "Jak rozpoznać MRKH?"],
  ["48:51", "W jaki sposób przekazywać diagnoze o zespole MRKH"],
  ["52:31", "Z czym się wiąże MRKH?"],
] as const;

// Get total count of subchapters for each chapter
const chapterSubchapterCounts = {
  1: perspetkywaPacjenta.length,
  2: perspektywaLekarska.length,
};

const timestampTo = (multiplier: number) => (timestamp: string) => {
  const [minutes, seconds] = timestamp.split(":").map(Number);
  return minutes * multiplier + seconds;
}


const timestampToSeconds = timestampTo(1);
const timestampToMilliseconds = timestampTo(1000);

// Generate chapter.subchapter IDs for completed items
const getSubchapterId = (chapterNo: number, subchapterIndex: number) =>
  `${chapterNo}.${subchapterIndex}`;

// Subchapter component
type SubchapterProps = HTMLAttributes<HTMLLIElement> & {
  isCurrent: boolean;
  done: boolean;
};

const Subchapter = React.forwardRef<HTMLLIElement, SubchapterProps>(
  ({ className, done, isCurrent, ...rest }) => {

    const style = cn(done ? "opacity-50" : "opacity-100", isCurrent ? "text-orange-500" : "text-eblue-500");
    return (
      <li
        className={cn(
          "cursor-pointer w-[220px] flex gap-1 justify-between items-center text-sm",
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
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <text
        textAnchor="middle"
        x="50%"
        y="50%"
        dy=".3em"
        className="font-monarcha text-eblue-800 text-2xl"
      >
        {completionPercent}%
      </text>
      <circle
        cx="50"
        cy="50"
        r="45"
        strokeWidth="15"
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
  title,
  children,
  completedItems,
  totalSubchapters,
}: {
  chapterNo: number;
  title: string;
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
        <AccordionTrigger className="flex items-center gap-4 px-0 pt-3 pb-1 border-eblue-400 border-b-[1px] text-nowrap">
          <div className="flex gap-2">
            <LoadCircle completionPercent={completionPercent} />
            <div className="flex flex-col">
              <h1 className="font-outfit text-sm">Część {chapterNo}</h1>
              <h2 className="font-monarcha text-base">{title}</h2>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent asChild className="pb-0">
          {children}
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  // if (!session?.user?.hasAccess) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

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
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [currentSubchapter, setCurrentSubchapter] = useState<number>(0);
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


  // Handler for marking current lesson as completed
  const handleMarkAsCompleted = async () => {
    const subchapterId = getSubchapterId(currentChapter, currentSubchapter);
    await markAsCompleted(subchapterId);
  };

  // Handler for time selection and loading indicator
  const onTimeSelect = (
    time: number,
    chapterNo: number,
    subchapterIndex: number
  ) => {
    if (!videoRef.current) return;
    // Set loading state
    setIsLoading(true);

    // Set current chapter and subchapter
    setCurrentChapter(chapterNo);
    setCurrentSubchapter(subchapterIndex);

    // Update video time
    videoRef.current.currentTime = time;

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

  const onVideoReady = React.useCallback((el: HTMLVideoElement) => {
    if (!el) return;

    videoRef.current = el;

    const timestampToChapterSubchapter = (timestamp: string) => {

    }

    const trackTime = (ms: number) => {
    }

    el.addEventListener('timeupdate', e => trackTime(e.timeStamp));
  }, []);

  return (
    <div className="flex flex-col w-full">
      <section className="basis-[120px] shrink-0">
        <Link href="/kurs" className="top-4 left-4 font-monarcha text-xl">
          MRKH to pestka!
        </Link>
        <h1 className="pt-5 font-monarcha text-orange-500 text-lg">
          Czesc 1: Perspektywa pacjencka
        </h1>
        <h2 className="font-monarcha text-2xl">1.6 Raport dotyczacy</h2>
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
          <ol className="grow-[1]">
            <Chapter.Item
              chapterNo={1}
              title="MRKH: perspektywa pacjencka"
              completedItems={completedSubchapters}
              totalSubchapters={chapterSubchapterCounts[1]}
            >
              <ol className="flex flex-col items-center pt-2">
                {perspetkywaPacjenta.map(([timestamp, title], index) => (
                  <Chapter.Subchapter
                    key={timestamp}
                    isCurrent={getSubchapterId(1, index) === `${currentChapter}.${currentSubchapter}`}
                    done={isCompleted(getSubchapterId(1, index))}
                    onClick={() =>
                      onTimeSelect(timestampToSeconds(timestamp), 1, index)
                    }
                  >
                    <span>{title}</span>
                    <Check className="w-4 h-4 text-white" />
                  </Chapter.Subchapter>
                ))}
              </ol>
            </Chapter.Item>
            <Chapter.Item
              chapterNo={2}
              title="MRKH: perspektywa lekarska"
              completedItems={completedSubchapters}
              totalSubchapters={chapterSubchapterCounts[2]}
            >
              <ol>
                {perspektywaLekarska.map(([timestamp, title], index) => (
                  <Chapter.Subchapter
                    key={timestamp}
                    isCurrent={getSubchapterId(1, index) === `${currentChapter}.${currentSubchapter}`}
                    done={isCompleted(getSubchapterId(2, index))}
                    onClick={() =>
                      onTimeSelect(timestampToSeconds(timestamp), 2, index)
                    }
                  >
                    {title}
                  </Chapter.Subchapter>
                ))}
              </ol>
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

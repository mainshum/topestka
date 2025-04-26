import { getServerSession } from "next-auth";
import Video from "next-video";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Mux from "@mux/mux-node";
import MailLayout from "@/components/mail-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import React, { HTMLAttributes } from "react";
import { cn } from "@/utils/misc";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";

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

const timestampToSeconds = (timestamp: string) => {
  const [minutes, seconds] = timestamp.split(":").map(Number);
  return minutes * 60 + seconds;
};

type SubchapterProps = HTMLAttributes<HTMLLIElement> & {
  done: boolean;
};

const Subchapter = React.forwardRef<HTMLLIElement, SubchapterProps>(
  ({ className, done, ...rest }) => {
    const style = done ? "text-eblue-300 line-through" : "text-eblue-500";
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

const LoadCircle = ({ percent }: { percent: number }) => (
  <div className="bg-red-400 rounded-full w-10 h-10">
    <svg viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        strokeWidth="10"
        fill="none"
        stroke="#4f46e5"
        strokeDasharray={`${percent * 2.83} ${100}`}
      />
    </svg>
  </div>
);

const Item = ({
  chapterNo,
  title,
  children,
}: {
  chapterNo: number;
  title: string;
  children: React.ReactNode;
}) => (
  <li>
    <AccordionItem value={`chapter-${chapterNo}`}>
      <AccordionTrigger className="flex items-center gap-4 px-0 pt-3 pb-1 border-eblue-400 border-b-[1px] text-nowrap">
        <div className="flex gap-2">
          <LoadCircle percent={30} />
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

const Chapter = {
  Item,
  Subchapter,
};

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

  return {
    props: {
      muxToken,
      playbackId,
    },
  };
};

export default function KursPage({
  muxToken,
  playbackId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const onTimeSelect = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

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
        <div className="flex flex-col justify-between items-start gap-6">
          <Video
            ref={videoRef}
            playbackToken={muxToken}
            playbackId={playbackId}
            className="h-full"
          />
          <Button
            className="px-6 border border-eblue-600 rounded-md"
            variant="ghost"
            size={"sm"}
          >
            Oznacz jako lekcję zakończoną
          </Button>
        </div>
        <Accordion asChild type="single" collapsible>
          <ol className="grow-[1]">
            <Chapter.Item chapterNo={1} title="MRKH: perspektywa pacjencka">
              <ol className="flex flex-col items-center pt-2">
                {perspetkywaPacjenta.map(([timestamp, title]) => (
                  <Chapter.Subchapter
                    key={timestamp}
                    done={timestampToSeconds(timestamp) < 1000}
                    onClick={() => onTimeSelect(timestampToSeconds(timestamp))}
                  >
                    <span>{title}</span>
                    <Check className="w-4 h-4 text-white" />
                  </Chapter.Subchapter>
                ))}
              </ol>
            </Chapter.Item>
            <Chapter.Item chapterNo={2} title="MRKH: perspektywa lekarska">
              <ol>
                {perspektywaLekarska.map(([timestamp, title]) => (
                  <Chapter.Subchapter
                    key={timestamp}
                    done={timestampToSeconds(timestamp) < 1000}
                    onClick={() => onTimeSelect(timestampToSeconds(timestamp))}
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

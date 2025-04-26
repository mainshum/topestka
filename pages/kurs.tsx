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

const perspetkywaPacjenta = [
  ['00:05' , 'Kim jesteśmy?'],
  ['00:52' , 'Czym jest zespół MRKH i z czym się wiąże?'],
  ['04:37' , 'Siedem rad dla Bezpestkowych'],
  ['07:51' , 'Kluczowe punkty w życiu osób z zespołem MRKH'],
  ['15:03' , 'Wnioski'],
  ['16:11' , 'Raport dotyczący komunikacji lekarzy z pacjentami '],
  ['18:19' , 'Dwie historie pacjentek z zespołem MRKH'],
  ['21:46' , 'Wnioski'],
  ['24:15' , 'Dlaczego istotnie jest słuchanie organizacji pacjenckich'],
] as const;

const perspektywaLekarska = [
  ['24:57' , 'Czym jest zespół MRKH?'],
  ['35:19' , 'Jak rozpoznać MRKH?'],
  ['48:51' , 'W jaki sposób przekazywać diagnoze o zespole MRKH'],
  ['52:31' , 'Z czym się wiąże MRKH?']
] as const;

const timestampToSeconds = (timestamp: string) => {
  const [minutes, seconds] = timestamp.split(":").map(Number);
  return minutes * 60 + seconds;
};
  
type SubchapterProps = HTMLAttributes<HTMLLIElement> & {
  done: boolean;
}

const Subchapter = React.forwardRef<HTMLLIElement, SubchapterProps>(({className, done, ...rest}) => {
  const style = done ? "text-eblue-300 line-through" : "text-eblue-500";
  return  <li className={cn("cursor-pointer", style, className)} {...rest}/>
});

Subchapter.displayName = "Subchapter";

const Item = ({chapterNo, title, children}: {chapterNo: number, title: string, children: React.ReactNode}) => (
    <li>
      <AccordionItem value={`chapter-${chapterNo}`}>
        <AccordionTrigger className="flex justify-center items-center gap-4 text-nowrap">
          <div className="bg-red-500 w-4 h-4"></div>
          <div className="flex flex-col">
            <h1 className="font-outfit">Część {chapterNo}</h1>
            <h2 className="font-monarcha text-lg">{title}</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {children}
        </AccordionContent>
      </AccordionItem>
    </li>
);

const Chapter = {
  Item,
  Subchapter
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
  }


  return (
    <div className="flex justify-center gap-8 p-4">
      <Video ref={videoRef} playbackToken={muxToken} playbackId={playbackId} />
      <Accordion asChild type="single" collapsible>
        <ol>
          <Chapter.Item chapterNo={1} title="MRKH: perspektywa pacjencka">
            <ol>
              {perspetkywaPacjenta.map(([timestamp, title]) => (
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
    </div>
  );
}

KursPage.getLayout = (page: React.ReactNode) => <MailLayout>{page}</MailLayout>;

import { getServerSession } from "next-auth";
import Video from "next-video";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Mux from "@mux/mux-node";

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl">
        <Video playbackToken={muxToken} playbackId={playbackId} />
      </div>
    </div>
  );
}

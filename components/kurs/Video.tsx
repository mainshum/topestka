import React, { useCallback, useEffect, useRef, useState } from 'react';
import Video from 'next-video';
import { videoSubchapters } from './data';

type VideoPageProps = {
  muxToken: string;
  playbackId: string;
  startTime: number;
  notifySubchatperPlaying: (subchapter: number) => void;
}

const Spinner = () => (
  <div className="animate-spin z-10 rounded-full h-4 w-4 border-t-1 border-b-2 border-ewhite absolute top-[calc(50%-4px)] left-[calc(50%-4px)]"></div>
)


const subchatperIndexFromTime = (time: number) => {
  const match = videoSubchapters.findIndex((current) => {
    if (time >= current.from && time < current.to) {
      return true;
    }
  })

  return match + 1;
}

const VideoPage = React.forwardRef<HTMLVideoElement, VideoPageProps>(
  ({ muxToken, playbackId, notifySubchatperPlaying, startTime }, ref) => {

    const notifySubchatperPlayingRef = useRef<((subchapter: number) => void)>(notifySubchatperPlaying);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
      if (!videoRef.current) return;

      const handleTimeUpdate = () => {
        notifySubchatperPlayingRef.current(subchatperIndexFromTime(videoRef.current?.currentTime || 0));
      };

      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }, []);

    const onVideoMount = useCallback((ref: HTMLVideoElement | null) => {
      if (!ref) return;

      videoRef.current = ref;
    }, []);

    const [showSpinner, setShowSpinner] = useState(true);

    return (
      <div className="relative flex flex-col justify-between items-start gap-6 w-full aspect-video">
        {showSpinner && <Spinner />}
        <Video
          ref={onVideoMount}
          playbackToken={muxToken}
          playbackId={playbackId}
          startTime={startTime}
          onCanPlay={() => setShowSpinner(false)}
          onSeeking={() => setShowSpinner(true)}
        />
      </div>
    );
  }
);

VideoPage.displayName = 'VideoPage';

export default VideoPage;
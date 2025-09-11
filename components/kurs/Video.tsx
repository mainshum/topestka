import React, { useCallback, useEffect, useRef } from 'react';
import Video from 'next-video';
import { chapters } from './data';

type VideoPageProps = {
  muxToken: string;
  playbackId: string;
  startTime: number;
  notifySubchatperPlaying: (subchapter: number) => void;
}

const videoEntries = chapters.video.subchapters;

const subchatperIndexFromTime = (time: number) => {
  const match = videoEntries.findIndex((current) => {
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

  const onVideoMount = useCallback((ref: HTMLVideoElement | null) => {
    if (!ref) return;

    videoRef.current = ref;
    // initial current time
    videoRef.current.currentTime = startTime;


    ref.addEventListener('timeupdate', () => {
      notifySubchatperPlayingRef.current(subchatperIndexFromTime(ref.currentTime));
    });
  }, [startTime]);

    return (
      <div className="relative flex flex-col justify-between items-start gap-6 w-full">
        <Video
          ref={onVideoMount}
          playbackToken={muxToken}
          playbackId={playbackId}
        />
      </div>
    );
  }
);

VideoPage.displayName = 'VideoPage';

export default VideoPage;
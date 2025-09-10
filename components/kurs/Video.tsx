import React, { useCallback, useEffect, useRef } from 'react';
import Video from 'next-video';
import { MarkCompleted } from './MarkCompleted';
import { chapters } from './data';

type VideoPageProps = {
  muxToken: string;
  playbackId: string;
  subchapter: number;
  onSubchapterChange: (subchapter: number) => void;
}

const videoEntries = chapters.video.subchapters;

const subchatperIndexFromTime = (time: number) => {
  const match = videoEntries.findIndex((current) => {
    if (time >= current.from && time < current.to) {
      return true;
    }
  })

  return match;
}

const VideoPage = React.forwardRef<HTMLVideoElement, VideoPageProps>(
  ({ muxToken, playbackId, subchapter, onSubchapterChange }, ref) => {

  const subchapterRef = useRef<number>(1);

  subchapterRef.current = subchapter;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = videoEntries[subchapter - 1].from || 0;
  }, [subchapter]);


  const onVideoMount = useCallback((ref: HTMLVideoElement | null) => {
    if (!ref) return;

    videoRef.current = ref;
    // initial current time
    videoRef.current.currentTime = videoEntries[subchapterRef.current - 1].from || 0;

    ref.addEventListener('timeupdate', () => {
      console.log('timeupdate', ref.currentTime);
      const fromTime = subchatperIndexFromTime(ref.currentTime);
      if (!fromTime || fromTime === subchapterRef.current) return;
      onSubchapterChange(fromTime + 1);
    })
  }, [onSubchapterChange]);

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
import React, { useCallback, useEffect, useRef } from 'react';
import Video from 'next-video';
import { MarkCompleted } from './MarkCompleted';
import { videoEntries } from './data';

type VideoPageProps = {
  muxToken: string;
  playbackId: string;
  subchapter: number;
  onSubchapterChange: (subchapter: number) => void;
}

const subchapterFromTime = (time: number) => {
  const match = videoEntries.find(([_sub, current]) => {
    if (time >= current.from && time < current.to) {
      return true;
    }
  })

  return match?.[1];
}

const VideoPage = React.forwardRef<HTMLVideoElement, VideoPageProps>(
  ({ muxToken, playbackId, subchapter, onSubchapterChange }, ref) => {

  const subchapterRef = useRef<number>(1);

  subchapterRef.current = subchapter;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = videoEntries.find(([_sub, current]) => current.partNo === subchapter)?.[1].from || 0;
  }, [subchapter]);


  const onVideoMount = useCallback((ref: HTMLVideoElement | null) => {
    if (!ref) return;

    videoRef.current = ref;
    // initial current time
    videoRef.current.currentTime = videoEntries.find(([_sub, current]) => current.partNo === subchapterRef.current)?.[1].from || 0;

    ref.addEventListener('timeupdate', () => {
      const fromTime = subchapterFromTime(ref.currentTime);
      if (!fromTime || fromTime.partNo === subchapterRef.current) return;
      onSubchapterChange(fromTime.partNo);
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
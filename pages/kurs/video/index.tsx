import React from 'react';
import Video from 'next-video';
import { useKurs } from '../context';
import { Button } from '@/components/Button';
import { Loader2 } from 'lucide-react';
import { allSubchapters } from '../data';

export default function VideoPage({ muxToken, playbackId }: { muxToken: string; playbackId: string }) {
  const { currentSubchapter, isLoading, setIsLoading, markAsCompleted, setCurrentSubchapter } = useKurs();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  if (!currentSubchapter || currentSubchapter === 'broszura') return null;

  const handleMarkAsCompleted = () => {
    if (!currentSubchapter) return;
    markAsCompleted(`${currentSubchapter.chapter}.${currentSubchapter.subchapter}`);
    const nextSubchapter = currentSubchapter.getNext();
    if (!nextSubchapter) return;
    onTimeSelect(nextSubchapter);
  };

  const onTimeSelect = (sc: typeof allSubchapters[0]) => {
    if (!videoRef.current) return;
    setIsLoading(true);

    videoRef.current.currentTime = sc.from / 1000;

    const handlePlaying = () => {
      setIsLoading(false);
      videoRef.current?.removeEventListener("playing", handlePlaying);
    };

    videoRef.current.addEventListener("playing", handlePlaying);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    videoRef.current.play().catch(() => {
      setIsLoading(false);
    });
  };

  const onVideoReady = React.useCallback((el: HTMLVideoElement) => {
    if (!el) return;
    videoRef.current = el;

    el.addEventListener("timeupdate", () => {
      const ms = el.currentTime * 1000;
      const match = allSubchapters.find(({ from, to }) => ms >= from && ms <= to);
      const matchWithFallback = match ?? allSubchapters[0];
      setCurrentSubchapter(matchWithFallback);
    });
  }, []);

  return (
    <div className="relative flex flex-col justify-between items-start gap-6">
      <Video
        ref={onVideoReady}
        playbackToken={muxToken}
        playbackId={playbackId}
        className="h-full"
      />
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
      )}
      <Button
        className="px-6 border border-eblue-600 rounded-md"
        variant="ghost"
        size="sm"
        onClick={handleMarkAsCompleted}
      >
        Oznacz jako lekcję zakończoną
      </Button>
    </div>
  );
} 
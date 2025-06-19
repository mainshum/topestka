import React, { useCallback, useRef } from 'react';
import Video from 'next-video';
import { Button } from '@/components/Button';
import { useKurs } from './context';

const VideoPage = React.forwardRef<HTMLVideoElement, { muxToken: string; playbackId: string }>(
  ({ muxToken, playbackId }, ref) => {

    const {currentSubchapterId, markAsCompleted} = useKurs();

    const handleMarkAsCompleted = () => markAsCompleted(currentSubchapterId);

    return (
      <div className="relative flex flex-col justify-between items-start gap-6 w-full">
        <Video
          ref={ref}
          playbackToken={muxToken}
          playbackId={playbackId}
        />
        {/* {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          )} */}
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
);

VideoPage.displayName = 'VideoPage';

export default VideoPage;
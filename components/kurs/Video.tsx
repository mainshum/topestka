import React from 'react';
import Video from 'next-video';
import { useKurs } from './context';
import { MarkCompleted } from './MarkCompleted';

const VideoPage = React.forwardRef<HTMLVideoElement, { muxToken: string; playbackId: string }>(
  ({ muxToken, playbackId }, ref) => {

    const {currentSubchapterId, markAsCompleted} = useKurs();

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
        <MarkCompleted markAsCompleted={markAsCompleted} currentSubchapterId={currentSubchapterId} />
      </div>
    );
  }
);

VideoPage.displayName = 'VideoPage';

export default VideoPage;
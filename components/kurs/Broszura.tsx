import React from 'react';
import { useKurs } from './context';
import { MarkCompleted } from './MarkCompleted';

export default function BroszuraPage({iframeSrc}: {iframeSrc: string}) {
  const { markAsCompleted, currentSubchapterId } = useKurs();

  return (
    <div className="relative flex flex-col justify-between items-start gap-6 w-full">
      <iframe
        src={iframeSrc}
        className="w-full h-[600px]"
        title="Broszura"
      />
      <MarkCompleted markAsCompleted={markAsCompleted} currentSubchapterId={currentSubchapterId} />
    </div>
  );
} 
import React from 'react';

interface BroszuraPageProps {
  iframeSrc: string;
}

export default function BroszuraPage({ iframeSrc }: BroszuraPageProps) {
  return (
        <iframe
          src={`${iframeSrc}`}
          className="border-0 w-full aspect-square md:aspect-video rounded-lg overflow-hidden"
          title="Broszura"
          style={{
            // Additional CSS to hide any remaining browser UI elements
            border: 'none',
            outline: 'none',
            // Mobile-specific scrolling fixes
            WebkitOverflowScrolling: 'touch',
            overflow: 'auto',
            // Ensure proper touch handling
            touchAction: 'pan-x pan-y',
            // Prevent zoom on double tap
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        />
  );
} 
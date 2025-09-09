import React from 'react';

export default function BroszuraPage({iframeSrc}: {iframeSrc: string}) {

  return (
    <div className="relative flex flex-col justify-between items-start gap-6 w-full">
      <iframe
        src={iframeSrc}
        className="w-full h-[600px]"
        title="Broszura"
      />
    </div>
  );
} 
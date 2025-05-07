import React from 'react';

interface LoadCircleProps {
  completionPercent: number;
}

export const LoadCircle: React.FC<LoadCircleProps> = ({ completionPercent }) => (
  <div className="relative rounded-full w-10 h-10">
    <svg viewBox="0 0 100 100" className="overflow-visible">
      <text
        textAnchor="middle"
        x="52%"
        y="60%"
        className="font-monarcha text-eblue-800 text-2xl"
      >
        {completionPercent}%
      </text>
      <circle
        cx="50"
        cy="50"
        r="45"
        strokeWidth="20"
        fill="none"
        stroke="#B4C0EE"
        strokeDasharray={`${completionPercent * 2.83} ${283}`}
        className="opacity-80"
        transform="rotate(-90 50 50)"
      />
    </svg>
  </div>
);

LoadCircle.displayName = 'Kurs.LoadCircle'; 
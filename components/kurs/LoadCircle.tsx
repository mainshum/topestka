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
        className="font-outfit text-eblue-800 text-2xl"
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
        strokeDasharray={`${100 * 2.83} ${283}`}
        transform="rotate(-90 50 50)"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        strokeWidth="20"
        fill="none"
        stroke="#2A4BCC"
        strokeDasharray={`${completionPercent * 2.83} ${283}`}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
    </svg>
  </div>
);

LoadCircle.displayName = 'Kurs.LoadCircle'; 
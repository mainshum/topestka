import React from 'react';
import { KursProvider } from '../context';

interface RootProps {
  children: React.ReactNode;
  initialCompletedSubchapters?: string[];
}

export const Root: React.FC<RootProps> = ({ children, initialCompletedSubchapters }) => {
  return (
    <KursProvider initialCompletedSubchapters={initialCompletedSubchapters}>
      <div className="flex flex-col w-full">
        {children}
      </div>
    </KursProvider>
  );
};

Root.displayName = 'Kurs.Root'; 
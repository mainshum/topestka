import React, { createContext, useContext, useState, useCallback } from 'react';
import { useCompletedItems } from '@/utils/completedItems';
import {allSubchapters} from './data'

type ContentType = 'video' | 'pdf';

export type Subchapter = {
  from: number;
  to: number;
  chapter: number;
  subchapter: number;
  subchapterTitle: string;
  getNext: () => Subchapter | null;
  type: ContentType;
};

type KursContextType = {
  currentSubchapter: Subchapter | 'broszura' | null;
  setCurrentSubchapter: (sc: Subchapter | 'broszura') => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  completedSubchapters: string[];
  isCompleted: (id: string) => boolean;
  markAsCompleted: (id: string) => void;
};

const KursContext = createContext<KursContextType | null>(null);

export const useKurs = () => {
  const context = useContext(KursContext);
  if (!context) {
    throw new Error('useKurs must be used within a KursProvider');
  }
  return context;
};

export const KursProvider: React.FC<{ children: React.ReactNode; initialCompletedSubchapters?: string[] }> = ({
  children,
  initialCompletedSubchapters = [],
}) => {
  const [currentSubchapter, setCurrentSubchapter] = useState<Subchapter | 'broszura' | null>(allSubchapters[0]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    items: completedSubchapters,
    isCompleted,
    markAsCompleted,
  } = useCompletedItems(
    'completedSubchapters',
    'topestka_completed_subchapters',
    initialCompletedSubchapters
  );

  return (
    <KursContext.Provider
      value={{
        currentSubchapter,
        setCurrentSubchapter,
        isLoading,
        setIsLoading,
        completedSubchapters,
        isCompleted,
        markAsCompleted,
      }}
    >
      {children}
    </KursContext.Provider>
  );
}; 
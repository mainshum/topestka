import React, { createContext, useContext, useState, useCallback } from 'react';
import { useCompletedItems } from '@/utils/completedItems';
import {Subchapter, videoSubchapters} from './data'

type ContentType = 'video' | 'pdf';

type KursContextType = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  completedSubchapters: string[];
  isCompleted: (id: string) => boolean;
  markAsCompleted: (id: string) => void;
  currentSubchapter: Subchapter 
  setCurrentSubchapter: (subchapter: Subchapter) => void;
};

const KursContext = createContext<KursContextType | null>(null);

export const useKurs = () => {
  const context = useContext(KursContext);
  if (!context) {
    throw new Error('useKurs must be used within a KursProvider');
  }
  return context;
};
const defaultSubchapter = videoSubchapters.get(1)!;

export const KursProvider: React.FC<{ children: React.ReactNode; initialCompletedSubchapters?: string[] }> = ({
  children,
  initialCompletedSubchapters = [],
}) => {

  const [currentSubchapter, setCurrentSubchapter] = useState<Subchapter>(defaultSubchapter);
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
import React from 'react';
import { useKurs } from '../context';
import { Button } from '@/components/Button';

export default function BroszuraPage() {
  const { markAsCompleted } = useKurs();

  const handleMarkAsCompleted = () => {
    markAsCompleted('3.1');
  };

  return (
    <div className="relative flex flex-col justify-between items-start gap-6">
      <iframe
        src="/kurs/broszura.pdf"
        className="w-full h-[600px]"
        title="Broszura"
      />
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
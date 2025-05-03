import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CompletedItemsType } from "./types";

// Hook to manage completed items (client-side only)
export function useCompletedItems(
  itemType: CompletedItemsType,
  storageKey: string,
  initialItems: string[] = []
) {
  const { data: session } = useSession();
  const [items, setItems] = useState<string[]>(initialItems);

  // Load from localStorage on mount
  useEffect(() => {
    // Only run in browser
    if (typeof window !== 'undefined') {
      const storedItems = localStorage.getItem(storageKey);
      if (storedItems) {
        setItems(storedItems.split(',').filter(Boolean));
      }
    }
  }, [storageKey]);

  // Check if item is completed
  const isCompleted = useCallback(
    (itemId: string) => items.includes(itemId),
    [items]
  );

  // Mark item as completed
  const markAsCompleted = useCallback(
    async (itemId: string) => {
      if (isCompleted(itemId)) return true;
      
      const newItems = [...items, itemId];
      setItems(newItems);
      
      // Save to localStorage (only in browser)
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, newItems.join(','));
      }
      
      // Save to server if user is logged in
      if (session?.user?.id) {
        try {
          const response = await fetch('/api/completed-items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              itemType,
              itemId,
            }),
          });
          
          return response.ok;
        } catch (error) {
          console.error(`Error updating ${itemType}:`, error);
          return false;
        }
      }
      
      return true;
    },
    [items, itemType, storageKey, session, isCompleted]
  );

  return {
    items,
    isCompleted,
    markAsCompleted,
  };
}
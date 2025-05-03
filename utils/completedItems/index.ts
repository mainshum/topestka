// Re-export client-side components
export { useCompletedItems } from './client';
export type { CompletedItemsType } from './types';

// Note: We do NOT export server-side components from this index file
// They should be imported directly from the server.ts file
// This ensures that server-side code doesn't get bundled with client-side code
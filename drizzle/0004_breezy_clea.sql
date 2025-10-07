ALTER TABLE `completedItems` ADD PRIMARY KEY(`userId`);--> statement-breakpoint
ALTER TABLE `completedItems` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `completedItems` DROP COLUMN `completedQuizzes`;--> statement-breakpoint
ALTER TABLE `completedItems` DROP COLUMN `completedFlashcards`;--> statement-breakpoint
ALTER TABLE `completedItems` DROP COLUMN `updatedAt`;
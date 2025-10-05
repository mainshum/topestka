ALTER TABLE `account` MODIFY COLUMN `refresh_token` varchar(255);--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `access_token` varchar(255);--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `expires_at` int;--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `token_type` varchar(255);--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `scope` varchar(255);--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `id_token` varchar(2048);--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `session_state` varchar(255);--> statement-breakpoint
ALTER TABLE `authenticator` MODIFY COLUMN `counter` int NOT NULL;--> statement-breakpoint
ALTER TABLE `authenticator` MODIFY COLUMN `credentialBackedUp` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `authenticator` MODIFY COLUMN `transports` varchar(255);--> statement-breakpoint
ALTER TABLE `transaction` MODIFY COLUMN `amount` int NOT NULL;--> statement-breakpoint
ALTER TABLE `transaction` MODIFY COLUMN `status` enum('pending','success','failed') NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `name` varchar(255);--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `email` varchar(255);--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `hasAccess` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `hasAccess` boolean NOT NULL DEFAULT false;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `emailVerified` timestamp(3);--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `image` varchar(255);--> statement-breakpoint
# ALTER TABLE `account` ADD PRIMARY KEY(`provider`,`providerAccountId`);--> statement-breakpoint
# ALTER TABLE `authenticator` ADD PRIMARY KEY(`userId`,`credentialID`);--> statement-breakpoint
# ALTER TABLE `user` ADD PRIMARY KEY(`id`);--> statement-breakpoint
# ALTER TABLE `verificationToken` ADD PRIMARY KEY(`identifier`,`token`);--> statement-breakpoint
ALTER TABLE `user` ADD `quizPassed` boolean DEFAULT false NOT NULL;
CREATE TABLE `usedDiscountTokens` (
	`token` varchar(255) NOT NULL,
	`usedAt` timestamp NOT NULL,
	CONSTRAINT `usedDiscountTokens_token` PRIMARY KEY(`token`)
);

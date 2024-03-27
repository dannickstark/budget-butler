CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`user_name` text,
	`age` integer,
	`email` text NOT NULL,
	`avatar` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
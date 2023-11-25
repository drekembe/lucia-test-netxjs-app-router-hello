CREATE TABLE `queue` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`owner_user_id` text NOT NULL,
	`is_paused` integer DEFAULT 1 NOT NULL,
	`is_deleted` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`owner_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `spot` (
	`id` text PRIMARY KEY NOT NULL,
	`queue_id` integer NOT NULL,
	`queued_at` text,
	`processed_at` text,
	`aborted_at` text,
	`processed_by_user_id` text,
	`processed_by_station_id` integer,
	FOREIGN KEY (`queue_id`) REFERENCES `queue`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`processed_by_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`processed_by_station_id`) REFERENCES `station`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `station` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`queue_id` integer NOT NULL,
	`current_user_id` text,
	`is_paused` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`queue_id`) REFERENCES `queue`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`current_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);

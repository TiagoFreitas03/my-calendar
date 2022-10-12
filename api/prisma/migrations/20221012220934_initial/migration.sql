-- CreateTable
CREATE TABLE `users` (
	`id` VARCHAR(36) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`birth_date` DATETIME(3) NULL,
	`picture` VARCHAR(255) NULL,
	`created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

	UNIQUE INDEX `users_email_key`(`email`),
	PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `labels` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`color` CHAR(6) NOT NULL,
	`user_id` VARCHAR(36) NOT NULL,

	PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
	`id` VARCHAR(36) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`description` TEXT NULL,
	`start` DATETIME(3) NOT NULL,
	`end` DATETIME(3) NULL,
	`notified` BOOLEAN NOT NULL DEFAULT false,
	`created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`user_id` VARCHAR(36) NOT NULL,

	PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_label` (
	`event_id` VARCHAR(36) NOT NULL,
	`label_id` INTEGER NOT NULL,

	PRIMARY KEY (`event_id`, `label_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_recovery_requests` (
	`id` VARCHAR(36) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

	UNIQUE INDEX `password_recovery_requests_email_key`(`email`),
	PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `labels`
	ADD CONSTRAINT `labels_user_id_fkey` FOREIGN KEY (`user_id`)
	REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events`
	ADD CONSTRAINT `events_user_id_fkey` FOREIGN KEY (`user_id`)
	REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_label`
	ADD CONSTRAINT `event_label_event_id_fkey` FOREIGN KEY (`event_id`)
	REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_label`
	ADD CONSTRAINT `event_label_label_id_fkey` FOREIGN KEY (`label_id`)
	REFERENCES `labels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

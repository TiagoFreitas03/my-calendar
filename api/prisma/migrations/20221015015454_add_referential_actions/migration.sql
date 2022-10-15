-- DropForeignKey
ALTER TABLE `event_label` DROP FOREIGN KEY `event_label_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_label` DROP FOREIGN KEY `event_label_label_id_fkey`;

-- AddForeignKey
ALTER TABLE `event_label` ADD CONSTRAINT `event_label_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_label` ADD CONSTRAINT `event_label_label_id_fkey` FOREIGN KEY (`label_id`) REFERENCES `labels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

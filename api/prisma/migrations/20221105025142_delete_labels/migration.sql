/*
	Warnings:

	- You are about to drop the `event_label` table. If the table is not empty, all the data it contains will be lost.
	- You are about to drop the `labels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `event_label` DROP FOREIGN KEY `event_label_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_label` DROP FOREIGN KEY `event_label_label_id_fkey`;

-- DropForeignKey
ALTER TABLE `labels` DROP FOREIGN KEY `labels_user_id_fkey`;

-- DropTable
DROP TABLE `event_label`;

-- DropTable
DROP TABLE `labels`;

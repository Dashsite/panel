/*
  Warnings:

  - You are about to drop the column `proxmox_hosts_id` on the `proxmox_product` table. All the data in the column will be lost.
  - You are about to drop the `proxmox_hosts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_provider_id` to the `product_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filter_type` to the `proxmox_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_provider_id` to the `proxmox_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filter_type` to the `pterodactyl_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_provider_id` to the `pterodactyl_product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `proxmox_product` DROP FOREIGN KEY `proxmox_hosts_proxmox_product`;

-- AlterTable
ALTER TABLE `product_categories` ADD COLUMN `product_provider_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `proxmox_product` DROP COLUMN `proxmox_hosts_id`,
    ADD COLUMN `filter_type` BOOLEAN NOT NULL,
    ADD COLUMN `product_provider_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pterodactyl_product` ADD COLUMN `filter_type` BOOLEAN NOT NULL,
    ADD COLUMN `product_provider_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `proxmox_hosts`;

-- CreateTable
CREATE TABLE `product_provider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provider_instance_categories_filter` (
    `id` INTEGER NOT NULL,
    `product_categories_id` INTEGER NOT NULL,
    `provider_instances_id` INTEGER NOT NULL,

    INDEX `product_categories_provider_instance_categories_filter`(`product_categories_id`),
    INDEX `provider_instances_provider_instance_categories_filter`(`provider_instances_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provider_instances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_provider_id` INTEGER NOT NULL,
    `connection_data` JSON NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `filter_type` BOOLEAN NOT NULL,

    INDEX `product_provider_provider_instances`(`product_provider_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proxmox_product_instance_filter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider_instances_id` INTEGER NOT NULL,
    `proxmox_product_id` INTEGER NOT NULL,

    INDEX `provider_instances_product_instance_filter`(`provider_instances_id`),
    INDEX `proxmox_product_proxmox_product_instance_filter`(`proxmox_product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pterodactyl_product_instance_filter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider_instances_id` INTEGER NOT NULL,
    `pterodactyl_product_id` INTEGER NOT NULL,

    INDEX `provider_instances_pterodactyl_product_instance_filter`(`provider_instances_id`),
    INDEX `pterodactyl_product_pterodactyl_product_instance_filter`(`pterodactyl_product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `product_provider_product_categories` ON `product_categories`(`product_provider_id`);

-- CreateIndex
CREATE INDEX `product_provider_proxmox_product` ON `proxmox_product`(`product_provider_id`);

-- CreateIndex
CREATE INDEX `product_provider_pterodactyl_product` ON `pterodactyl_product`(`product_provider_id`);

-- AddForeignKey
ALTER TABLE `product_categories` ADD CONSTRAINT `product_provider_product_categories` FOREIGN KEY (`product_provider_id`) REFERENCES `product_provider`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `proxmox_product` ADD CONSTRAINT `product_provider_proxmox_product` FOREIGN KEY (`product_provider_id`) REFERENCES `product_provider`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pterodactyl_product` ADD CONSTRAINT `product_provider_pterodactyl_product` FOREIGN KEY (`product_provider_id`) REFERENCES `product_provider`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `provider_instance_categories_filter` ADD CONSTRAINT `product_categories_provider_instance_categories_filter` FOREIGN KEY (`product_categories_id`) REFERENCES `product_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `provider_instance_categories_filter` ADD CONSTRAINT `provider_instances_provider_instance_categories_filter` FOREIGN KEY (`provider_instances_id`) REFERENCES `provider_instances`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `provider_instances` ADD CONSTRAINT `product_provider_provider_instances` FOREIGN KEY (`product_provider_id`) REFERENCES `product_provider`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `proxmox_product_instance_filter` ADD CONSTRAINT `provider_instances_product_instance_filter` FOREIGN KEY (`provider_instances_id`) REFERENCES `provider_instances`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `proxmox_product_instance_filter` ADD CONSTRAINT `proxmox_product_proxmox_product_instance_filter` FOREIGN KEY (`proxmox_product_id`) REFERENCES `proxmox_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pterodactyl_product_instance_filter` ADD CONSTRAINT `provider_instances_pterodactyl_product_instance_filter` FOREIGN KEY (`provider_instances_id`) REFERENCES `provider_instances`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pterodactyl_product_instance_filter` ADD CONSTRAINT `pterodactyl_product_pterodactyl_product_instance_filter` FOREIGN KEY (`pterodactyl_product_id`) REFERENCES `pterodactyl_product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

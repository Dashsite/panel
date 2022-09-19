/*
  Warnings:

  - You are about to drop the column `forname` on the `billing_adresses` table. All the data in the column will be lost.
  - You are about to drop the column `phonenumber` on the `billing_adresses` table. All the data in the column will be lost.
  - You are about to drop the column `postalcode` on the `billing_adresses` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `billing_adresses` table. All the data in the column will be lost.
  - You are about to drop the `game_server_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `game_server_systems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `proxmox_options` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pterodactyl_server_options` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vps_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vps_systems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `zipcode` to the `billing_adresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `game_server_product` DROP FOREIGN KEY `GAME_SERVER_TYPES_GAME_SERVER_PRODUCT`;

-- DropForeignKey
ALTER TABLE `game_server_product` DROP FOREIGN KEY `PTERODACTYL_OPTIONS_GAME_SERVER_PRODUCT`;

-- DropForeignKey
ALTER TABLE `vps_product` DROP FOREIGN KEY `PROXMOX_OPTIONS_VPS_PRODUCT`;

-- DropForeignKey
ALTER TABLE `vps_product` DROP FOREIGN KEY `VPS_SYSTEMS_VPS_PRODUCT`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(255) NULL,
    ADD COLUMN `role` VARCHAR(30) NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `billing_adresses` DROP COLUMN `forname`,
    DROP COLUMN `phonenumber`,
    DROP COLUMN `postalcode`,
    DROP COLUMN `surname`,
    ADD COLUMN `firstname` VARCHAR(255) NULL,
    ADD COLUMN `lastname` VARCHAR(255) NULL,
    ADD COLUMN `phone` VARCHAR(255) NULL,
    ADD COLUMN `zipcode` VARCHAR(255) NOT NULL,
    MODIFY `state` VARCHAR(255) NULL;

-- DropTable
DROP TABLE `game_server_product`;

-- DropTable
DROP TABLE `game_server_systems`;

-- DropTable
DROP TABLE `proxmox_options`;

-- DropTable
DROP TABLE `pterodactyl_server_options`;

-- DropTable
DROP TABLE `vps_product`;

-- DropTable
DROP TABLE `vps_systems`;

-- CreateTable
CREATE TABLE `ResetToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ResetToken_token_key`(`token`),
    UNIQUE INDEX `ResetToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_categories` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promox_hosts` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `max_cpu` INTEGER NOT NULL,
    `max_ram` INTEGER NOT NULL,
    `max_disk` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proxmox_product` (
    `id` INTEGER NOT NULL,
    `promox_hosts_id` INTEGER NOT NULL,
    `product_categories_id` INTEGER NOT NULL,
    `price_per_hour` DECIMAL(10, 4) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `cpu_cores` INTEGER NOT NULL,
    `memory` INTEGER NOT NULL,
    `minimum_memory` INTEGER NOT NULL,
    `disk_size` INTEGER NOT NULL,
    `cpu_bllooning` BOOLEAN NOT NULL,

    INDEX `product_categories_proxmox_product`(`product_categories_id`),
    INDEX `promox_hosts_proxmox_product`(`promox_hosts_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pterodactyl_product` (
    `id` INTEGER NOT NULL,
    `product_categories_id` INTEGER NOT NULL,
    `name` VARBINARY(255) NOT NULL,
    `price_per_hour` DECIMAL(10, 4) NOT NULL,
    `memory` INTEGER NOT NULL,
    `cpu` INTEGER NOT NULL,
    `disk_storage` INTEGER NOT NULL,
    `block_io_weight` INTEGER NOT NULL,
    `db_limit` INTEGER NOT NULL,
    `allocation_limit` INTEGER NOT NULL,
    `backup_limit` INTEGER NOT NULL,

    INDEX `product_categories_pterodactyl_product`(`product_categories_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `proxmox_product` ADD CONSTRAINT `product_categories_proxmox_product` FOREIGN KEY (`product_categories_id`) REFERENCES `product_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `proxmox_product` ADD CONSTRAINT `promox_hosts_proxmox_product` FOREIGN KEY (`promox_hosts_id`) REFERENCES `promox_hosts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pterodactyl_product` ADD CONSTRAINT `product_categories_pterodactyl_product` FOREIGN KEY (`product_categories_id`) REFERENCES `product_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

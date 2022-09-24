/*
  Warnings:

  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `name` on the `product_categories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `name` on the `proxmox_hosts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the column `cpu_bllooning` on the `proxmox_product` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `proxmox_product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `name` on the `pterodactyl_product` table. The data in that column could be lost. The data in that column will be cast from `VarBinary(255)` to `VarChar(255)`.
  - Added the required column `cpu_ballooning` to the `proxmox_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product_categories` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `proxmox_hosts` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `proxmox_product` DROP COLUMN `cpu_bllooning`,
    ADD COLUMN `cpu_ballooning` BOOLEAN NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pterodactyl_product` MODIFY `name` VARCHAR(191) NOT NULL;

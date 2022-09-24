/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `userId` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `type` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `provider` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `providerAccountId` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `token_type` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `scope` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `session_state` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `sessionToken` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `userId` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `creation_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `identifier` on the `VerificationToken` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `token` on the `VerificationToken` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `user_id` on the `billing_adresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `User_id` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - Added the required column `invoice_email` to the `billing_adresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `billing_adresses` DROP FOREIGN KEY `User_BILLING_ADRESSES`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `User_PAYMENTS`;

-- AlterTable
ALTER TABLE `Account` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `type` VARCHAR(191) NOT NULL,
    MODIFY `provider` VARCHAR(191) NOT NULL,
    MODIFY `providerAccountId` VARCHAR(191) NOT NULL,
    MODIFY `token_type` VARCHAR(191) NULL,
    MODIFY `scope` VARCHAR(191) NULL,
    MODIFY `session_state` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Session` MODIFY `sessionToken` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `avatar`,
    DROP COLUMN `creation_date`,
    DROP COLUMN `username`,
    ADD COLUMN `createdAt` TIMESTAMP(0) NULL,
    ADD COLUMN `updatedAt` TIMESTAMP(0) NULL,
    MODIFY `disabled` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `VerificationToken` MODIFY `identifier` VARCHAR(191) NOT NULL,
    MODIFY `token` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `billing_adresses` ADD COLUMN `invoice_email` TEXT NOT NULL,
    ADD COLUMN `tax_id` VARCHAR(255) NULL,
    MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `payments` MODIFY `User_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `billing_adresses` ADD CONSTRAINT `User_BILLING_ADRESSES` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `User_PAYMENTS` FOREIGN KEY (`User_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

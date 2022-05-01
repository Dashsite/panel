/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `creation_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `avatar`,
    DROP COLUMN `creation_date`,
    DROP COLUMN `username`,
    ADD COLUMN `createdAt` TIMESTAMP(0) NULL,
    ADD COLUMN `updatedAt` TIMESTAMP(0) NULL,
    MODIFY `id` VARCHAR(255) NOT NULL,
    MODIFY `name` VARCHAR(255) NULL,
    MODIFY `email` VARCHAR(255) NULL,
    MODIFY `image` VARCHAR(255) NULL,
    MODIFY `disabled` BOOLEAN NULL,
    ADD PRIMARY KEY (`id`);

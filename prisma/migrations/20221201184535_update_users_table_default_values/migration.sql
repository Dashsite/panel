-- AlterTable
ALTER TABLE `User` MODIFY `disabled` BOOLEAN NULL DEFAULT false,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

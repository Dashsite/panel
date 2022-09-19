-- CreateTable
CREATE TABLE `billing_adresses` (
    `id` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `forname` VARCHAR(255) NULL,
    `surname` VARCHAR(255) NULL,
    `company_name` VARCHAR(255) NULL,
    `adress_line_1` VARCHAR(255) NOT NULL,
    `adress_line_2` VARCHAR(255) NULL,
    `postalcode` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `phonenumber` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,

    INDEX `User_BILLING_ADRESSES`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game_server_product` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price_per_hour` DECIMAL(10, 0) NOT NULL,
    `game_server_systems_id` INTEGER NOT NULL,
    `pterodactyl_server_options_id` INTEGER NULL,

    INDEX `GAME_SERVER_TYPES_GAME_SERVER_PRODUCT`(`game_server_systems_id`),
    INDEX `PTERODACTYL_OPTIONS_GAME_SERVER_PRODUCT`(`pterodactyl_server_options_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game_server_systems` (
    `id` INTEGER NOT NULL,
    `system_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_providers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(255) NOT NULL,
    `User_id` VARCHAR(255) NOT NULL,
    `payment_providers_id` INTEGER NOT NULL,
    `provider_payment_id` VARCHAR(255) NOT NULL,
    `product_type` VARCHAR(255) NOT NULL,
    `product_id` INTEGER NOT NULL,
    `tax_value` DECIMAL(10, 0) NOT NULL,
    `tax_percent` INTEGER NOT NULL,
    `total_price` DECIMAL(10, 0) NOT NULL,

    INDEX `PAYMENT_PROVIDERS_PAYMENTS`(`payment_providers_id`),
    INDEX `User_PAYMENTS`(`User_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proxmox_options` (
    `id` INTEGER NOT NULL,
    `cpu_cores` INTEGER NOT NULL,
    `memory` INTEGER NOT NULL,
    `minimum_memory` INTEGER NULL,
    `disk_size` INTEGER NOT NULL,
    `cpu_ballooning` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pterodactyl_server_options` (
    `id` INTEGER NOT NULL,
    `memory` INTEGER NOT NULL,
    `cpu` INTEGER NOT NULL,
    `disk_storage` INTEGER NOT NULL,
    `block_io_weight` INTEGER NOT NULL,
    `db_limit` INTEGER NOT NULL,
    `allocation_limit` INTEGER NOT NULL,
    `backup_limit` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vps_product` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price_per_hour` INTEGER NOT NULL,
    `vps_systems_id` INTEGER NOT NULL,
    `proxmox_options_id` INTEGER NULL,

    INDEX `PROXMOX_OPTIONS_VPS_PRODUCT`(`proxmox_options_id`),
    INDEX `VPS_SYSTEMS_VPS_PRODUCT`(`vps_systems_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vps_systems` (
    `id` INTEGER NOT NULL,
    `system_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `provider` VARCHAR(255) NOT NULL,
    `providerAccountId` VARCHAR(255) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(255) NULL,
    `scope` VARCHAR(255) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(255) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(255) NOT NULL,
    `sessionToken` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(255) NULL,
    `username` VARCHAR(255) NOT NULL,
    `creation_date` TIMESTAMP(0) NOT NULL,
    `disabled` BOOLEAN NOT NULL,
    `avatar` VARCHAR(255) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `billing_adresses` ADD CONSTRAINT `User_BILLING_ADRESSES` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_server_product` ADD CONSTRAINT `GAME_SERVER_TYPES_GAME_SERVER_PRODUCT` FOREIGN KEY (`game_server_systems_id`) REFERENCES `game_server_systems`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `game_server_product` ADD CONSTRAINT `PTERODACTYL_OPTIONS_GAME_SERVER_PRODUCT` FOREIGN KEY (`pterodactyl_server_options_id`) REFERENCES `pterodactyl_server_options`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `PAYMENT_PROVIDERS_PAYMENTS` FOREIGN KEY (`payment_providers_id`) REFERENCES `payment_providers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `User_PAYMENTS` FOREIGN KEY (`User_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vps_product` ADD CONSTRAINT `PROXMOX_OPTIONS_VPS_PRODUCT` FOREIGN KEY (`proxmox_options_id`) REFERENCES `proxmox_options`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vps_product` ADD CONSTRAINT `VPS_SYSTEMS_VPS_PRODUCT` FOREIGN KEY (`vps_systems_id`) REFERENCES `vps_systems`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

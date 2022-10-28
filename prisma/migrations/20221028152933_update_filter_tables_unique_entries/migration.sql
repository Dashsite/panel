/*
  Warnings:

  - The primary key for the `provider_instance_categories_filter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `proxmox_product_instance_filter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pterodactyl_product_instance_filter` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `provider_instance_categories_filter` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`, `product_categories_id`, `provider_instances_id`);

-- AlterTable
ALTER TABLE `proxmox_product_instance_filter` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`, `provider_instances_id`, `proxmox_product_id`);

-- AlterTable
ALTER TABLE `pterodactyl_product_instance_filter` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`, `provider_instances_id`, `pterodactyl_product_id`);

-- AlterTable
ALTER TABLE `provider_instances` MODIFY `filter_type` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `proxmox_product` MODIFY `filter_type` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `pterodactyl_product` MODIFY `filter_type` BOOLEAN NOT NULL DEFAULT false;

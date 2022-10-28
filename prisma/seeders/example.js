const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const seedProviders = async () => {
    console.log('Seeding providers ...')
    await prisma.product_provider.createMany({
        skipDuplicates: true,
        data: [
            {
                id: 1,
                name: 'Proxmox',
            },
            {
                id: 2,
                name: 'Pterodactyl',
            },
        ],
    })
}

const seedProviderInstances = async () => {
    console.log('Seeding provider instances ...')
    await prisma.provider_instances.createMany({
        skipDuplicates: true,
        data: [
            {
                id: 1,
                name: 'Proxmox 1',
                product_provider_id: 1,
                connection_data: {
                    connection_string: 'https://proxmox1.example.com:8006/api2/json',
                    username: 'root@pam',
                    password: 'password',
                },
            },
            {
                id: 2,
                name: 'Proxmox 2',
                product_provider_id: 1,
                connection_data: {
                    connection_string: 'https://proxmox2.example.com:8006/api2/json',
                    username: 'root@pam',
                    password: 'password',
                },
            },
            {
                id: 3,
                name: 'Pterodactyl 1',
                product_provider_id: 2,
                connection_data: {
                    url: 'https://pterodactyl1.example.com',
                    api_application_key: '12345567',
                    api_admin_key: '12345567',
                },
            },
        ],
    })
}

const seedCategories = async () => {
    console.log('Seeding product categories ...')
    await prisma.product_categories.createMany({
        skipDuplicates: true,
        data: [
            {
                id: 1,
                name: 'VPS',
                product_provider_id: 1,
            },
            {
                id: 2,
                name: 'Dedicated Server',
                product_provider_id: 1,
            },
            {
                id: 3,
                name: 'Minecraft',
                product_provider_id: 2,
            },
        ],
    })
}

const seedProxmoxProducts = async () => {
    console.log('Seeding proxmox products ...')
    await prisma.proxmox_product.createMany({
        skipDuplicates: true,
        data: [
            {
                id: 1,
                name: 'VPS 1',
                price_per_hour: 0.01,
                product_categories_id: 1,
                product_provider_id: 1,
                cpu_cores: 1,
                memory: 1024,
                minimum_memory: 1024,
                disk_size: 10,
                cpu_ballooning: false,
            },
            {
                id: 2,
                name: 'Dedicated 1',
                price_per_hour: 0.02,
                product_categories_id: 2,
                product_provider_id: 1,
                cpu_cores: 2,
                memory: 2048,
                minimum_memory: 2048,
                disk_size: 20,
                cpu_ballooning: false,
            },
        ],
    })
}

const seedPterodactylProducts = async () => {
    console.log('Seeding pterodactyl products ...')
    await prisma.pterodactyl_product.createMany({
        skipDuplicates: true,
        data: [
            {
                id: 1,
                name: 'Minecraft 1',
                price_per_hour: 0.01,
                product_categories_id: 3,
                product_provider_id: 2,
                cpu: 100,
                memory: 1024,
                disk_storage: 10,
                block_io_weight: 500,
                db_limit: 0,
                allocation_limit: 1,
                backup_limit: 1,
            },
            {
                id: 2,
                name: 'Minecraft 2',
                price_per_hour: 0.02,
                product_categories_id: 3,
                product_provider_id: 2,
                cpu: 200,
                memory: 2048,
                disk_storage: 20,
                block_io_weight: 500,
                db_limit: 0,
                allocation_limit: 1,
                backup_limit: 1,
            },
        ],
    })
}

const seed = async () => {
    await seedProviders()
    await seedProviderInstances()
    await seedCategories()
    await seedProxmoxProducts()
    await seedPterodactylProducts()
}

module.exports = seed

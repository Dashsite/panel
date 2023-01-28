const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const seedApplicationConfig = async () => {
    console.log('Seeding application config ...')
    await prisma.config.createMany({
        skipDuplicates: true,
        data: [
            {
                id: 'auth:GOOGLE_CLIENT_ID',
                value: { value: '', expires: null },
            },
            {
                id: 'auth:GOOGLE_CLIENT_SECRET',
                value: { value: '', expires: null },
            },
            {
                id: 'auth:GITHUB_CLIENT_ID',
                value: { value: '', expires: null },
            },
            {
                id: 'auth:GITHUB_CLIENT_SECRET',
                value: { value: '', expires: null },
            },
            {
                id: 'system:EMAIL_SERVER_HOST',
                value: { value: '', expires: null },
            },
            {
                id: 'system:EMAIL_SERVER_PORT',
                value: { value: '', expires: null },
            },
            {
                id: 'system:EMAIL_SERVER_USER',
                value: { value: '', expires: null },
            },
            {
                id: 'system:EMAIL_SERVER_PASSWORD',
                value: { value: '', expires: null },
            },
            {
                id: 'system:EMAIL_FROM',
                value: { value: '', expires: null },
            },
        ],
    })
}

const seed = async () => {
    await seedApplicationConfig()
}

module.exports = seed

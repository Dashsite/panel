const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const seedApplicationConfig = async () => {
    console.log('Seeding settings ...')
    await prisma.config.createMany({
        skipDuplicates: true,
        data: [
            {
                id: 'auth:GOOGLE_CLIENT_ID',
                value: JSON.stringify({
                    value: {
                        label: 'Google Client ID',
                        value: null,
                        type: 'string',
                        description: 'Your google oauth client id - https://google.com/',
                        encrypted: true,
                    },
                    expires: null,
                }),
            },
            {
                id: 'auth:GOOGLE_CLIENT_SECRET',
                value: JSON.stringify({
                    value: {
                        label: 'Google Client Secret',
                        value: null,
                        type: 'string',
                        description: 'Your google oauth client secret - https://google.com/',
                        encrypted: true,
                    },
                    expires: null,
                }),
            },
            {
                id: 'auth:GITHUB_CLIENT_ID',
                value: JSON.stringify({
                    value: {
                        label: 'Github Client ID',
                        value: null,
                        type: 'string',
                        description: 'Your github oauth client id - https://github.com/',
                        encrypted: true,
                    },
                    expires: null,
                }),
            },
            {
                id: 'auth:GITHUB_CLIENT_SECRET',
                value: JSON.stringify({
                    value: {
                        label: 'Github Client Secret',
                        value: null,
                        type: 'string',
                        description: 'Your github oauth client secret - https://github.com/',
                        encrypted: true,
                    },
                    expires: null,
                }),
            },

            {
                id: 'system:EMAIL_SERVER_HOST',
                value: JSON.stringify({
                    value: {
                        label: 'SMTP Host Address',
                        value: null,
                        type: 'string',
                    },
                    expires: null,
                }),
            },
            {
                id: 'system:EMAIL_SERVER_PORT',
                value: JSON.stringify({
                    value: {
                        label: 'SMTP Port',
                        value: null,
                        type: 'number',
                    },
                    expires: null,
                }),
            },
            {
                id: 'system:EMAIL_SERVER_USER',
                value: JSON.stringify({
                    value: {
                        label: 'SMTP User',
                        value: null,
                        type: 'string',
                    },
                    expires: null,
                }),
            },
            {
                id: 'system:EMAIL_SERVER_PASSWORD',
                value: JSON.stringify({
                    value: {
                        label: 'SMTP Password',
                        value: null,
                        type: 'string',
                    },
                    expires: null,
                }),
            },
            {
                id: 'system:EMAIL_FROM',
                value: JSON.stringify({
                    value: {
                        label: 'Email From Adress',
                        value: null,
                        type: 'string',
                        description: 'The email adress that will be used as sender',
                    },
                    expires: null,
                }),
            },
            {
                id: 'pterodactyl:API_URL',
                value: JSON.stringify({
                    value: {
                        label: 'Pterodactyl API URL',
                        value: '',
                        type: 'string',
                        description: 'The URL to your pterodactyl panel API',
                        validation: 'uri',
                    },
                    expires: null,
                }),
            },
            {
                id: 'pterodactyl:APP_API_KEY',
                value: JSON.stringify({
                    value: {
                        label: 'Pterodactyl application API Key',
                        value: null,
                        type: 'string',
                        description: 'The application API key for your pterodactyl application',
                        encrypted: true,
                    },
                    expires: null,
                }),
            },
            {
                id: 'pterodactyl:ADMIN_API_KEY',
                value: JSON.stringify({
                    value: {
                        label: 'Pterodactyl admin API Key',
                        value: null,
                        type: 'string',
                        description:
                            'The admin API key for your pterodactyl application - create a user api key with admin permissions',
                        encrypted: true,
                    },
                    expires: null,
                }),
            },
        ],
    })
}

const seed = async () => {
    await seedApplicationConfig()
}

module.exports = seed

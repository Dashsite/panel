const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const seedApplicationConfig = async () => {
    console.log('Seeding application config ...')
    await prisma.config.createMany({
        skipDuplicates: true,
        data: [
            {
                id: 'auth:GOOGLE_CLIENT_ID',
                value: JSON.stringify({
                    value: {
                        label: 'Google Client ID',
                        value: '',
                        description: 'Your google oauth client id - https://google.com/',
                        type: 'text',
                    },
                    expires: null,
                }),
            },
            {
                id: 'auth:GOOGLE_CLIENT_SECRET',
                value: JSON.stringify({
                    value: {
                        label: 'Google Client Secret',
                        value: '',
                        description: 'Your google oauth client secret - https://google.com/',
                        type: 'text',
                    },
                    expires: null,
                }),
            },
            {
                id: 'auth:GITHUB_CLIENT_ID',
                value: JSON.stringify({
                    value: {
                        label: 'Github Client ID',
                        value: '',
                        description: 'Your github oauth client id - https://github.com/',
                        type: 'text',
                    },
                    expires: null,
                }),
            },
            {
                id: 'auth:GITHUB_CLIENT_SECRET',
                value: JSON.stringify({
                    value: {
                        label: 'Github Client Secret',
                        value: '',
                        description: 'Your github oauth client secret - https://github.com/',
                        type: 'text',
                    },
                    expires: null,
                }),
            },

            {
                id: 'system:EMAIL_SERVER_HOST',
                value: JSON.stringify({
                    value: {
                        label: 'SMTP Host Adress',
                        value: '',
                        type: 'text',
                    },
                    expires: null,
                }),
            },
            {
                id: 'system:EMAIL_SERVER_PORT',
                value: JSON.stringify({
                    value: {
                        label: 'SMTP Port',
                        value: '',
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
                        value: '',
                        type: 'text',
                    },
                    expires: null,
                }),
            },
            {
                id: 'system:EMAIL_SERVER_PASSWORD',
                value: JSON.stringify({
                    value: {
                        label: 'SMTP Password',
                        value: '',
                        type: 'text',
                    },
                    expires: null,
                }),
            },
            {
                id: 'system:EMAIL_FROM',
                value: JSON.stringify({
                    value: {
                        label: 'Email From Adress',
                        value: '',
                        type: 'text',
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

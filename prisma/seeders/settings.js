const { PrismaClient } = require('@prisma/client')
const settings = require('./settings/index.js')

const prisma = new PrismaClient()

const seedApplicationConfig = async () => {
    console.log('Seeding settings ...')

    // flatten the settings object into an array of settingsoptions
    const configOptions = Object.values(settings()).flat()

    await prisma.config.createMany({
        skipDuplicates: true,
        data: configOptions,
    })
}

const seed = async () => {
    await seedApplicationConfig()
}

module.exports = seed

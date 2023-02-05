const { PrismaClient } = require('@prisma/client')
const settings = require('./settings/index.js')

const prisma = new PrismaClient()

const seedApplicationConfig = async () => {
    console.log('Seeding settings ...')

    // flatten the settings object into an array of objects
    // each namespace key has an array of objects
    // all of these objects need to be flattened into a single array
    const configOptions = Object.values(settings()).flat()

    console.log(configOptions)

    await prisma.config.createMany({
        skipDuplicates: true,
        data: configOptions,
    })
}

const seed = async () => {
    await seedApplicationConfig()
}

module.exports = seed

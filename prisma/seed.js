const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

const main = async () => {
    console.log('Start seeding ...')

    // Run every seeder inside the prisma/seeders

    const files = fs.readdirSync(path.join(__dirname, 'seeders'))

    for await (const file of files) {
        const seeder = require(`./seeders/${file}`)
        console.log(`Running seeder ${file} ...`)
        await seeder()
    }
}

main()
    .then(() => {
        console.log('Seeding completed!')
        prisma.$disconnect()
        process.exit(0)
    })
    .catch(e => {
        console.error(e)
        prisma.$disconnect()
        process.exit(1)
    })

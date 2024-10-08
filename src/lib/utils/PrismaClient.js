import { PrismaClient } from '@prisma/client'

// See here: https://github.com/prisma/prisma-client-js/issues/228#issuecomment-618433162
/**
 * @type {PrismaClient}
 */
let prisma

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }

    prisma = global.prisma
}

/**
 * Exports a prisma client instance.
 */
export default prisma

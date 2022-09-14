import prisma from 'src/lib/utils/PrismaClient'

/**
 * @openapi
 * /api/account:
 *  get:
 *    description: Returns the account information
 *    responses:
 *      200:
 *        description: Account information
 *    tags:
 *      - Account
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 * @returns {Promise<void>}
 */

export default async (req, res) => {
    const {
        body: { token },
        method,
    } = req

    if (method !== 'GET') return res.status(405).end()

    // get user from token
    const user = await prisma.user.findUnique({
        where: {
            id: token.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    })
    res.status(200).json(user)
}

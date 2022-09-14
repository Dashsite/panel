import prisma from 'src/lib/utils/PrismaClient'
import { getToken } from 'next-auth/jwt'

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
    const { method } = req
    if (method !== 'GET') return res.status(405).end()

    const token = await getToken({ req })

    try {
        // get user from token
        const user = await prisma.user.findUnique({
            where: {
                id: token.user.id,
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
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

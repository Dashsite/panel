import prisma from 'src/lib/utils/PrismaClient'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 * @returns {Promise<void>}
 *
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
    })
    res.status(200).json(user)
}

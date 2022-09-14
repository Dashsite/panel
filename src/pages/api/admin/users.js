import prisma from 'src/lib/utils/PrismaClient'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 * @returns {Promise<void>}
 *
 */
export default async (req, res) => {
    if (req.method !== 'GET') return res.status(405).end()

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            disabled: true,
            email: true,
            emailVerified: true,
            image: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    })
    res.status(200).json(users)
}

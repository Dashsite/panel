import prisma from 'src/lib/utils/PrismaClient'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 * @returns {Promise<void>}
 *
 */
export default async (req, res) => {
    const {
        query: { id },
        method,
    } = req

    switch (method) {
        case 'GET':
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
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
            res.status(200).json(user)

            break
        case 'PUT':
            // Update or create data in your database
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

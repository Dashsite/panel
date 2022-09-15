import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get(
    /**
     *
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     */
    async (req, res) => {
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
)

export default handler

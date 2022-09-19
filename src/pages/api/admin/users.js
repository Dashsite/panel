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

handler.post(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { name, email, password } = req.body

        // validate email and name
        const { error } = registerSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        // forward to auth/register route
        const response = await fetch(`${process.env.APP_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })
        const jsonReponse = await response.json()

        if (jsonReponse === 200) {
            return res.status(200).json(user)
        }

        return res.status(500).json(jsonReponse.error)
    }
)

export default handler

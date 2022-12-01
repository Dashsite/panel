import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'
import { registerSchema } from 'src/lib/validations/user'
import { validationFormatter, validationOptions } from 'src/lib/validations'

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
        const { name, email, password, role } = req.body

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
                role,
            }),
        })
        const jsonReponse = await response.json()

        if (jsonReponse === 200) {
            Log.info(`User ${email} created by user ${req.session.user.id}`)
            return res.status(200).json(user)
        }

        Log.error(jsonReponse.error, `Error creating user ${email} by user ${req.session.user.id}`)
        return res.status(500).json({ error: 'Internal server error' })
    }
)

export default handler

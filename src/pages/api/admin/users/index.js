import prisma from 'src/lib/utils/PrismaClient'
import bcrypt from 'bcrypt'
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
                username: true,
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
        const { username, email, password, role } = req.body

        // validate email and name
        const { error } = registerSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // validate the data using the schema in src/lib/validations/user.js
            const { error } = registerSchema.validate({ ...req.body }, validationOptions)
            if (error) return res.status(400).json({ error: validationFormatter(error) })

            const passwordHash = await bcrypt.hash(password, 9)

            const user = await prisma.user.create({
                data: {
                    username,
                    email: email,
                    password: passwordHash,
                    role,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                select: {
                    id: true,
                    username: true,
                    disabled: true,
                    email: true,
                    emailVerified: true,
                    image: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            })

            Log.info(`User ${email} created`)
            return res.status(200).json(user)
        } catch (err) {
            if (err.code === 'P2002') return res.status(409).json({ error: 'Email already exists' })

            Log.error(err.message, `Error creating new user ${email}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

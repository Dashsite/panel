import bcrypt from 'bcrypt'
import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import { validationFormatter, validationOptions } from 'src/lib/validations'
import { registerSchema } from 'src/lib/validations/user'

const handler = nextConnect()

handler.post(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { username, email, password } = req.body

        try {
            // validate the data using the schema in src/lib/validations/user.js
            const { error } = registerSchema.validate({ ...req.body }, validationOptions)
            if (error) return res.status(400).json({ error: validationFormatter(error) })

            const passwordHash = await bcrypt.hash(password, 9)
            await prisma.user.create({
                data: {
                    name: username,
                    email: email,
                    password: passwordHash,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            })

            return res.status(200).end()
        } catch (err) {
            if (err.code === 'P2002') return res.status(409).json({ error: 'Email already exists' })
            //return error when in debug mode
            if (process.env.NODE_ENV === 'development') {
                return res.status(500).json({ error: error.message })
            }
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

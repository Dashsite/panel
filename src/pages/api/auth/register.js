import bcrypt from 'bcrypt'
import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'

import { validationFormatter, validationOptions } from 'src/lib/validations'
import { registerSchema } from 'src/lib/validations/user'
import { sendVerificationEmail } from 'src/server/emailVerification'

const handler = nextConnect()

handler.post(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { name, email, password } = req.body

        try {
            // validate the data using the schema in src/lib/validations/user.js
            const { error } = registerSchema.validate({ ...req.body }, validationOptions)
            if (error) return res.status(400).json({ error: validationFormatter(error) })

            const passwordHash = await bcrypt.hash(password, 9)
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: passwordHash,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    image: `/images/avatars/${Math.floor(Math.random() * 8) + 1}.png`,
                },
            })

            // send verification email by calling the route GET /api/auth/verification with with the users session token
            fetch(`${process.env.NEXTAUTH_URL}/api/auth/verification`, {
                method: 'GET',
                headers: {
                    cookie: req.headers.cookie,
                },
            })

            Log.info(`User ${email} created`)
            return res.status(200).end()
        } catch (err) {
            if (err.code === 'P2002') return res.status(409).json({ error: 'Email already exists' })

            Log.error(err.message, `Error creating new user ${email}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

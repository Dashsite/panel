import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/lib/utils/nextConnect'
import { getToken } from 'next-auth/jwt'
import { userDataSchema } from 'src/lib/validations/user'
import { validationFormatter, validationOptions } from 'src/lib/validations'

const handler = nextConnect()

handler.get(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     */
    async (req, res) => {
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
)

handler.patch(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     */
    async (req, res) => {
        const { username, email } = req.body
        const token = await getToken({ req })

        //Validate Username and email
        const { error } = userDataSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // Check if any user has this email address
            const user = await prisma.user.findUnique({
                where: { email },
            })
            if (user) return res.status(400).json({ error: { email: 'Email address is already in use.' } })

            // update user email address
            await prisma.user.update({
                where: {
                    id: token.user.id,
                },
                data: {
                    name: username,
                    email: email,
                },
            })

            res.status(200).end()
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
)

export default handler

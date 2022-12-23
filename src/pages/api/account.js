import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'

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
        try {
            // get user from token
            const user = await prisma.user.findUnique({
                where: {
                    id: req.session.user.id,
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

            return res.status(200).json(user)
        } catch (error) {
            Log.error(error.message, `Error getting user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
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
        const { name, email } = req.body

        //Validate name and email
        const { error } = userDataSchema.validate({ name, email }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // Check if any user has this email address
            const user = await prisma.user.findUnique({
                where: { email },
            })
            if (user && user.id != req.session.user.id)
                return res.status(400).json({ error: { email: 'Email address is already in use.' } })

            // update user email address
            const updatedUser = await prisma.user.update({
                where: {
                    id: req.session.user.id,
                },
                data: {
                    name,
                    email: email,
                    emailVerified: user ? req.session.user.emailVerified : null,
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

            Log.info(`User ${req.session.user.id} updated email address to ${email}`)
            return res.status(200).json(updatedUser)
        } catch (error) {
            Log.error(error.message, `Error updating user ${req.session.user.id} by user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

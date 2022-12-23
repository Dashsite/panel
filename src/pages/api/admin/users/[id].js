import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'

import { userDataSchema, userDataUpdateSchema } from 'src/lib/validations/user'
import { validationFormatter, validationOptions } from 'src/lib/validations'

const handler = nextConnect()

handler.get(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        try {
            const users = await prisma.user.findUnique({
                where: {
                    id: req.query.id,
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

            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
)

handler.delete(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        try {
            const user = await prisma.user.delete({
                where: {
                    id: req.query.id,
                },
            })

            Log.info(`User ${user.id} deleted by user ${req.session.user.id}`)
            return res.status(200).end()
        } catch (error) {
            Log.error(error.message, `Error deleting user ${req.query.id} by user ${req.session.user.id}`)
            return res.status(500).json({ error: error.message })
        }
    }
)

handler.patch(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { name, email, role, disabled } = req.body

        // validate email and name
        const { error } = userDataUpdateSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            const user = await prisma.user.update({
                where: {
                    id: req.query.id,
                },
                data: {
                    name,
                    email,
                    role,
                    disabled,
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

            Log.info(`User ${user.id} updated by user ${req.session.user.id}`)
            return res.status(200).json(user)
        } catch (error) {
            if (error.code === 'P2025') {
                Log.error(error.message, `Error updating user ${req.query.id} by user ${req.session.user.id}`)
                return res.status(404).json({ error: 'User not found' })
            }
            Log.error(error.message, `Error updating user ${req.query.id} by user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)
export default handler

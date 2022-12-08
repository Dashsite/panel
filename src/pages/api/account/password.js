import fs from 'fs'

import Log from 'src/lib/utils/Logger'
import nextConnect from 'src/middleware'
import prisma from 'src/lib/utils/PrismaClient'
import { resetSchema } from 'src/lib/validations/user'
import { validationFormatter, validationOptions } from 'src/lib/validations'
import confirmPassword from 'src/lib/utils/confirmPassword'

const handler = nextConnect()

// reset password
handler.post(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { password, currentPassword } = req.body
        const { user } = req.session

        if (!user) return res.status(401).json({ error: [{ Password: 'Unauthorized' }] })
        if (password === currentPassword)
            return res
                .status(400)
                .json({ error: [{ Password: 'New password cannot be the same as current password' }] })

        //Get User password hash from database
        const userFromDB = await prisma.user.findUnique({ where: { id: user.id } }, { select: { password: true } })
        if (userFromDB.password) {
            if (!currentPassword) return res.status(400).json({ error: [{ Password: 'Current password is required' }] })

            // check if current password is correct
            const result = await confirmPassword(currentPassword, userFromDB.password)
            if (result !== true) return res.status(400).json({ error: ['Current password is incorrect'] })
        }

        // validate password with resetSchema
        const { error } = resetSchema.validate({ password }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            const hashedPassword = await bcrypt.hash(password, 9)

            await prisma.user.update({
                where: { id: user.id },
                data: { password: hashedPassword },
            })

            return res.status(200).end()
        } catch (error) {
            Log.error(error)
            return res.status(500).json({ error: ['Internal server error'] })
        }
    }
)

export default handler

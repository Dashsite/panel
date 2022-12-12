import bcrypt from 'bcrypt'
import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'
import {
    createVerificationToken,
    deleteVerificationToken,
    findVerificationToken,
    sendVerificationEmail,
} from 'src/server/emailVerification'

const handler = nextConnect()

handler.get(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        // get the userId from the session
        const { user } = req.session

        // create a new verification token for a user which expires in 20 minutes
        const token = await createVerificationToken(user)

        // send the verification email
        sendVerificationEmail(user, token)

        return res.status(200).end()
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
        const { token } = req.body
        const { user } = req.session

        // verify the token
        const found = await findVerificationToken(token)
        if (!found) return res.status(400).json({ error: 'Invalid or expired token' })

        await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
        })

        // delete the token from the database
        await deleteVerificationToken(token)

        return res.status(200).end()
    }
)

export default handler

import prisma from 'src/lib/utils/PrismaClient'
import { email as emailValidator } from 'src/lib/validations/user'
import { getToken } from 'next-auth/jwt'

/**
 * @openapi
 * /api/account/email:
 *   put:
 *     description: Update the email address
 *     responses:
 *       200:
 *         description: Email address updated
 *     tags:
 *      - Account
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 * @returns {Promise<void>}
 */
export default async (req, res) => {
    const {
        body: { email },
        method,
    } = req
    if (method !== 'PATCH') return res.status(405).end()

    const token = await getToken({ req })

    console.log(token.user.id)

    // Validate Email
    if (!email) return res.status(400).json({ error: 'Email is required' })
    const ok = emailValidator.validate(email)
    if (ok.error) return res.status(400).json({ error: ok.error.message })

    try {
        // Check if any user has this email address
        const user = await prisma.user.findUnique({
            where: { email },
        })
        if (user) return res.status(400).json({ error: 'Email address is already in use.' })

        // update user email address
        const updatedUser = await prisma.user.update({
            where: {
                id: token.user.id,
            },
            data: {
                email: email,
            },
        })

        res.status(200).end()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

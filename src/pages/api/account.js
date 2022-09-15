import prisma from 'src/lib/utils/PrismaClient'
import { getToken } from 'next-auth/jwt'
import { userDataSchema } from 'src/lib/validations/user'
import { validationFormatter, validationOptions } from 'src/lib/validations'

/**
 * @openapi
 * /api/account:
 *  get:
 *    description: Returns the account information
 *    responses:
 *      200:
 *        description: Account information
 *    tags:
 *      - Account
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 * @returns {Promise<void>}
 */

export default async (req, res) => {
    const { method, body } = req
    const token = await getToken({ req })

    switch (method) {
        case 'GET':
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
            break
        case 'PATCH':
            // Validate Username and email
            const { error } = userDataSchema.validate({ ...body }, validationOptions)
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
}

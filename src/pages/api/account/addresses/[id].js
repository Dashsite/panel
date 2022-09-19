import { getToken } from 'next-auth/jwt'
import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/lib/utils/nextConnect'
import { validationFormatter, validationOptions } from 'src/lib/validations'
import { addressSchema } from 'src/lib/validations/address'

const handler = nextConnect()

handler.get(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const token = await getToken({ req })

        try {
            //find the address by id and user id
            const addresses = await prisma.billing_adresses.findUnique({
                where: {
                    id: req.query.id,
                    user_id: token.user.id,
                },
            })
            if (!addresses) return res.status(404).end()

            return res.status(200).json(addresses)
        } catch (error) {
            return res.status(500).end()
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
        const token = await getToken({ req })
        try {
            const count = await prisma.billing_adresses.deleteMany({
                where: {
                    AND: [
                        {
                            id: req.query.id,
                        },
                        {
                            user_id: token.user.id,
                        },
                    ],
                },
            })
            if (!count.count) return res.status(404).end()

            return res.status(200).json(count)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: error.message })
        }
    }
)

export default handler

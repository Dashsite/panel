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
            const addresses = await prisma.billing_adresses.findMany({
                where: {
                    user_id: token.user.id,
                },
            })
            return res.status(200).json(addresses)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
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
        const {
            firstname,
            lastname,
            company_name,
            adress_line_1,
            adress_line_2,
            zipcode,
            country,
            state,
            phone,
            city,
        } = req.body

        const token = await getToken({ req })

        const { error } = addressSchema.validate(req.body, validationOptions)
        if (error) return res.status(400).json(validationFormatter(error))

        try {
            const address = await prisma.billing_adresses.create({
                data: {
                    user_id: token.user.id,
                    firstname,
                    lastname,
                    company_name,
                    adress_line_1,
                    adress_line_2,
                    zipcode,
                    country,
                    state,
                    phone,
                    city,
                },
            })
            return res.status(200).json(address)
        } catch (error) {
            console.error(error)
            return res.status(500).json(error.message)
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
                    user_id: token.user.id,
                },
            })
            if (!count) return res.status(404).end()

            return res.status(200).json(count)
        } catch (error) {
            return res.status(500).end()
        }
    }
)

export default handler

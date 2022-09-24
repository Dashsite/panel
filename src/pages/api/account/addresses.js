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

            // format invoice_emails to array. String is separated by semi-colon
            addresses.forEach(address => {
                address.invoice_email = address.invoice_email.split(';')
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
            tax_id,
            invoice_email,
        } = req.body

        const token = await getToken({ req })

        const { error } = addressSchema.validate(req.body, validationOptions)
        if (error) return res.status(400).json(validationFormatter(error))

        // format invoice_email array to string seperated by semicolon
        const invoice_email_string = invoice_email.join(';')

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
                    tax_id,
                    invoice_email: invoice_email_string,
                },
            })

            // format invoice_emails to array. String is separated by semi-colon
            address.invoice_email = address.invoice_email.split(';')

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

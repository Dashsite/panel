import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
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
        try {
            //find the address by id and user id
            const addresses = await prisma.billing_adresses.findFirst({
                where: {
                    id: req.query.id,

                    user_id: req.session.user.id,
                },
            })
            if (!addresses) return res.status(404).end()

            return res.status(200).json(addresses)
        } catch (error) {
            Log.error(error.message, `Error fetching addresses for user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

handler.put(
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

        const { error } = addressSchema.validate(req.body, validationOptions)
        if (error) return res.status(400).json(validationFormatter(error))

        // format invoice_emails to string. String is separated by semi-colon
        const invoice_email_string = invoice_email.join(';')

        try {
            const address = await prisma.billing_adresses.update({
                where: {
                    AND: [
                        {
                            id: req.query.id,
                        },
                        {
                            user_id: req.session.user.id,
                        },
                    ],
                },
                data: {
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

            Log.info(`Billing Address ${address.id} updated for user ${req.session.user.id}`)
            return res.status(200).json(address)
        } catch (error) {
            Log.error(error.message, `Error updating billing address for user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
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
            const count = await prisma.billing_adresses.deleteMany({
                where: {
                    AND: [
                        {
                            id: req.query.id,
                        },
                        {
                            user_id: req.session.user.id,
                        },
                    ],
                },
            })
            if (!count.count) return res.status(404).end()

            Log.info(`Billing Address ${req.query.id} deleted for user ${req.session.user.id}`)
            return res.status(200).json(count)
        } catch (error) {
            Log.error(error.message, `Error deleting billingaddress for user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

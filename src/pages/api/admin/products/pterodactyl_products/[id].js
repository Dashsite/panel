import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'next-connect'
import { validationFormatter, validationOptions } from 'src/lib/validations'
import { pterodactylProductSchema } from 'src/lib/validations/products'

const handler = nextConnect()

handler.put(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const {
            name,
            product_categories_id,
            price_per_hour,
            cpu_cores,
            memory,
            minimum_memory,
            disk_size,
            cpu_ballooning,
        } = req.body

        // validate body
        const { error } = pterodactylProductSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // update product
            const product = await prisma.pterodactyl_product.update({
                where: {
                    id: req.query.id,
                },
                data: {
                    name,
                    product_categories_id,
                    price_per_hour,
                    cpu_cores,
                    memory,
                    minimum_memory,
                    disk_size,
                    cpu_ballooning,
                },
            })
            return res.status(200).json(product)
        } catch (error) {
            //return error when in debug mode
            if (process.env.NODE_ENV === 'development') {
                return res.status(500).json({ error: error.message })
            }
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
            // delete product
            const product = await prisma.pterodactyl_product.delete({
                where: {
                    id: req.query.id,
                },
            })
            return res.status(200).json(product)
        } catch (error) {
            //return error when in debug mode
            if (process.env.NODE_ENV === 'development') {
                return res.status(500).json({ error: error.message })
            }
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

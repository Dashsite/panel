import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'

import { validationFormatter, validationOptions } from 'src/lib/validations'
import { pterodactylProductSchema } from 'src/lib/validations/products'

const handler = nextConnect()

handler.post(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const {
            product_categories_id,
            name,
            price_per_hour,
            memory,
            cpu,
            disk_storage,
            block_io_weight,
            db_limit,
            allocation_limit,
            backup_limit,
            product_provider_id,
            filter_type,
        } = req.body

        // validate body
        const { error } = pterodactylProductSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // create new product
            const product = await prisma.pterodactyl_product.create({
                data: {
                    product_categories: { connect: { id: Number(product_categories_id) } },
                    product_provider: { connect: { id: Number(product_provider_id) } },
                    name,
                    price_per_hour,
                    memory,
                    cpu,
                    disk_storage,
                    block_io_weight,
                    db_limit,
                    allocation_limit,
                    backup_limit,
                    filter_type,
                },
            })

            Log.info(`Product ${product.id} created by user ${req.session.user.id}`)
            return res.status(200).json(product)
        } catch (error) {
            Log.error(error.message, `Error creating product by user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

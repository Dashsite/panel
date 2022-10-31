import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'

import { validationFormatter, validationOptions } from 'src/lib/validations'
import { pterodactylProductSchema, pterodactylProductPatchSchema } from 'src/lib/validations/products'

const handler = nextConnect()

handler.patch(
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
            filter_type,
        } = req.body

        // validate body
        const { error } = pterodactylProductPatchSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // update product
            const product = await prisma.pterodactyl_product.update({
                where: {
                    id: req.query.id,
                },
                data: {
                    product_categories: { connect: { id: Number(product_categories_id) } },
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

            Log.info(`Product ${product.id} updated by user ${req.session.user.id}`)
            return res.status(200).json(product)
        } catch (error) {
            if (error.code === 'P2025') return res.status(404).json({ error: 'Product not found' })

            Log.error(error.message, `Error updating product ${req.query.id} by user ${req.session.user.id}`)
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

            Log.info(`Product ${product.id} deleted by user ${req.session.user.id}`)
            return res.status(200).end()
        } catch (error) {
            if (error.code === 'P2025') return res.status(404).json({ error: 'Product not found' })

            Log.error(error.message, `Error deleting product ${req.query.id} by user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

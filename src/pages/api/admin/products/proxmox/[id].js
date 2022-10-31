import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'

import { validationFormatter, validationOptions } from 'src/lib/validations'
import { proxmoxProductSchema, proxmoxProductPatchSchema } from 'src/lib/validations/products'

const handler = nextConnect()

handler.patch(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { id } = req.query
        const {
            price_per_hour,
            name,
            cpu_cores,
            memory,
            minimum_memory,
            disk_size,
            cpu_ballooning,
            product_categories_id,
            filter_type,
        } = req.body

        try {
            // validate body
            const { error } = proxmoxProductPatchSchema.validate({ ...req.body }, validationOptions)
            if (error) return res.status(400).json({ error: validationFormatter(error) })

            // update proxmox product by id with new data from body that is not undefined
            const proxmoxProduct = await prisma.proxmox_product.update({
                where: {
                    id: Number(id),
                },
                data: {
                    product_categories: product_categories_id
                        ? { connect: { id: Number(product_categories_id) } }
                        : undefined,
                    price_per_hour,
                    name,
                    cpu_cores,
                    memory,
                    minimum_memory,
                    disk_size,
                    cpu_ballooning,
                    filter_type,
                },
            })

            Log.info(`Proxmox product ${proxmoxProduct.id} updated by user ${req.session.user.id}`)
            return res.status(200).json(proxmoxProduct)
        } catch (error) {
            if (error.code === 'P2025') return res.status(404).json({ error: 'Proxmox product not found' })

            Log.error(error.message, `Error updating proxmox product ${id} by user ${req.session.user.id}`)
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
        const { id } = req.query

        try {
            // delete proxmox product by id
            const proxmoxProduct = await prisma.proxmox_product.delete({
                where: {
                    id: Number(id),
                },
            })
            return res.status(200).end()
        } catch (error) {
            if (error.code === 'P2025') return res.status(404).json({ error: 'Proxmox product not found' })

            Log.error(error.message, `Error deleting proxmox product ${id} by user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

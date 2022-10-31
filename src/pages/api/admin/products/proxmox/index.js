import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'

import { validationFormatter, validationOptions } from 'src/lib/validations'
import { proxmoxProductSchema } from 'src/lib/validations/products'

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
            // get all proxmox products
            const proxmoxProducts = await prisma.proxmox_product.findMany()
            return res.status(200).json(proxmoxProducts)
        } catch (error) {
            Log.error(error.message, `Error fetching all proxmox products by user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
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
            proxmox_hosts_id,
            product_categories_id,
            product_provider_id,
            price_per_hour,
            name,
            cpu_cores,
            memory,
            minimum_memory,
            disk_size,
            cpu_ballooning,
            filter_type,
        } = req.body

        // validate body
        const { error } = proxmoxProductSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // create new proxmox product
            const product = await prisma.proxmox_product.create({
                data: {
                    product_categories: { connect: { id: Number(product_categories_id) } },
                    product_provider: { connect: { id: Number(product_provider_id) } },
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

            Log.info(`Proxmox product ${product.id} created by user ${req.session.user.id}`)
            return res.status(200).json(product)
        } catch (error) {
            Log.error(error.message, `Error creating new proxmox product by user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

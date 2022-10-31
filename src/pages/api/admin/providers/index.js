import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'

import { validationFormatter, validationOptions } from 'src/lib/validations'
import { productProviderSchema } from 'src/lib/validations/providers'

const handler = nextConnect()

handler.get(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { include } = req.query

        try {
            const productProviders = await prisma.product_provider.findMany({
                include: {
                    provider_instances: true,
                    product_categories: true,
                    pterodactyl_product: include.includes('products') ? true : false,
                    proxmox_product: include.includes('products') ? true : false,
                },
            })

            return res.status(200).json(productProviders)
        } catch (error) {
            Log.error(error.message, `Error getting product providers`)
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
        const { name } = req.body

        // validate body
        const { error } = productProviderSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // create new product provider
            const productProvider = await prisma.product_provider.create({
                data: {
                    name,
                },
            })

            Log.info(`Product provider ${productProvider.id} created by ${req.session.user.id}`)
            return res.status(200).json(productProvider)
        } catch (error) {
            Log.error(error.message, `Error creating product provider for ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

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
        try {
            const { providerId, include } = req.query

            const productProvider = await prisma.product_provider.findUnique({
                where: {
                    id: Number(providerId),
                },
                include: {
                    product_categories: include?.includes('categories') ? true : false,
                    pterodactyl_product: include?.includes('products') ? true : false,
                    proxmox_product: include?.includes('products') ? true : false,
                    provider_instances: include?.includes('instances') ? true : false,
                },
            })

            if (include?.includes('products')) {
                productProvider.products = []
                // find a key that includes "product" in its name and rename it to "products"
                Object.keys(productProvider).forEach(key => {
                    // key includes _product and is not empty
                    if (key.includes('_product')) {
                        productProvider.products = productProvider.products.concat(productProvider[key])
                        delete productProvider[key]
                    }
                })
            }

            return res.status(200).json(productProvider)
        } catch (error) {
            if (error.code === 'P2025') res.status(404).json({ error: 'Product provider not found' })

            Log.error(error.message, `Error getting product provider`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

handler.patch(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { name } = req.body
        const { providerId } = req.query

        // validate body
        const { error } = productProviderSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // update product provider
            const productProvider = await prisma.product_provider.update({
                where: {
                    id: Number(providerId),
                },
                data: {
                    name,
                },
            })

            Log.info(`Product provider ${productProvider.id} updated by ${req.session.user.id}`)
            return res.status(200).json(productProvider)
        } catch (error) {
            if (error.code === 'P2025') res.status(404).json({ error: 'Product provider not found' })

            Log.error(error.message, `Error updating product provider for ${req.session.user.id}`)
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
        const { providerId } = req.query

        try {
            // delete product provider
            const productProvider = await prisma.product_provider.delete({
                where: {
                    id: Number(providerId),
                },
            })

            Log.info(`Product provider ${productProvider.id} deleted by ${req.session.user.id}`)
            return res.status(200).json(productProvider)
        } catch (error) {
            if (error.code === 'P2025') res.status(404).json({ error: 'Product provider not found' })

            Log.error(error.message, `Error deleting product provider for ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import { validationFormatter, validationOptions } from 'src/lib/validations'
import { productCategoriesSchema } from 'src/lib/validations/products'
import Log from 'src/lib/utils/Logger'

const handler = nextConnect()

handler.patch(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { name } = req.body
        const { providerId, id } = req.query

        // validate body
        const { error } = productCategoriesSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // update category
            const category = await prisma.product_categories.update({
                where: {
                    id: Number(id),
                    product_provider_id: Number(providerId),
                },
                data: {
                    name,
                },
            })

            Log.info(`Category ${category.id} updated by user ${req.session.user.id}`)
            return res.status(200).json(category)
        } catch (error) {
            if (error.code === 'P2025') return res.status(404).json({ error: 'Category not found' })

            Log.error(error.message, `Error updating category ${req.query.id}`)
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
        const { providerId, id } = req.query
        try {
            // delete category
            const count = await prisma.product_categories.delete({
                where: {
                    id: Number(id),
                    product_provider_id: Number(providerId),
                },
            })
            if (count === 0) return res.status(404).json({ error: 'Category not found' })

            Log.info(`Category ${req.query.id} deleted by user ${req.session.user.id}`)
            return res.status(200).end()
        } catch (error) {
            if (error.code === 'P2025') return res.status(404).json({ error: 'Category not found' })

            Log.error(error.message, `Error deleting category ${req.query.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

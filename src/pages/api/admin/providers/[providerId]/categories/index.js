import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'
import { validationFormatter, validationOptions } from 'src/lib/validations'
import { productCategoriesSchema } from 'src/lib/validations/products'

const handler = nextConnect()

handler.get(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { providerId } = req.query

        try {
            // get all categories
            const categories = await prisma.product_categories.findMany({
                where: {
                    product_provider_id: Number(providerId),
                },
            })
            return res.status(200).json(categories)
        } catch (error) {
            Log.error(error.message, `Error fetching all categories by user ${req.session.user.id}`)
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
        const { providerId } = req.query

        // validate body
        const { error } = productCategoriesSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // create new category
            const category = await prisma.product_categories.create({
                data: {
                    name,
                    product_provider_id: Number(providerId),
                },
            })

            Log.info(`Category ${category.id} created by user ${req.session.user.id}`)
            return res.status(200).json(category)
        } catch (error) {
            Log.error(error.message, `Error creating new category by user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

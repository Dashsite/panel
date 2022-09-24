import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import { validationFormatter, validationOptions } from 'src/lib/validations'
import { productCategoriesSchema } from 'src/lib/validations/products'

const handler = nextConnect()

handler.put(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { name } = req.body

        // validate body
        const { error } = productCategoriesSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // update category
            const category = await prisma.product_categories.update({
                where: {
                    id: Number(req.query.id),
                },
                data: {
                    name,
                },
            })
            return res.status(200).json(category)
        } catch (error) {
            if (error.code === 'P2025') return res.status(404).json({ error: 'Category not found' })

            //return error when in debug mode
            if (process.env.NODE_ENV === 'development') return res.status(500).json({ error: error.message })

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
            // delete category
            const count = await prisma.product_categories.delete({
                where: {
                    id: Number(req.query.id),
                },
            })
            return res.status(200).end()
        } catch (error) {
            if (error.code === 'P2025') return res.status(404).json({ error: 'Category not found' })
            //return error when in debug mode
            if (process.env.NODE_ENV === 'development') return res.status(500).json({ error: error.message })

            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

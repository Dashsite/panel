import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
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
        try {
            // get all categories
            const categories = await prisma.product_categories.findMany()
            return res.status(200).json(categories)
        } catch (error) {
            //return error when in debug mode
            if (process.env.NODE_ENV === 'development') {
                return res.status(500).json({ error: error.message })
            }
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
        const { error } = productCategoriesSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // create new category
            const category = await prisma.product_categories.create({
                data: {
                    name,
                },
            })
            return res.status(200).json(category)
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

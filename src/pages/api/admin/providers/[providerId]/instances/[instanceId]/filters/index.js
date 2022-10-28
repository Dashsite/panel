import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'

const handler = nextConnect()

handler.get(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { instanceId } = req.query

        try {
            // get provider instance by id
            const instance = await prisma.provider_instance_categories_filter.findMany({
                where: {
                    provider_instances_id: Number(instanceId),
                },
            })

            return res.status(200).json(instance)
        } catch (error) {
            if (error.code === 'P2025') res.status(404).json({ error: 'Provider instance not found' })

            Log.error(error.message, `Error getting provider instance`)
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
        const { instanceId } = req.query
        const { product_categories_id } = req.body

        try {
            // update provider instance
            const instance = await prisma.provider_instance_categories_filter.create({
                data: {
                    provider_instances_id: Number(instanceId),
                    product_categories_id: Number(product_categories_id),
                },
            })

            Log.info(`Provider instance filter ${instanceId} created by user ${req.session.user.id}`)
            return res.status(200).json(instance)
        } catch (error) {
            if (error.message.includes('Foreign key constraint failed on the field'))
                return res.status(404).json({ error: 'Category not found' })

            Log.error(error.message, `Error creating provider instance filter for user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

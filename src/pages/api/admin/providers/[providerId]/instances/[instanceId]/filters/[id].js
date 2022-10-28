import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
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
        const { product_categories_id, id } = req.body
        const { instanceId } = req.query

        try {
            // update provider instance
            const instance = await prisma.provider_instance_categories_filter.update({
                where: {
                    id: Number(id),
                },
                data: {
                    product_categories_id: Number(product_categories_id),
                    provider_instances_id: Number(instanceId),
                },
            })

            Log.info(`Provider instance filter ${instance.id} updated by ${req.session.user.id}`)
            return res.status(200).json(instance)
        } catch (error) {
            if (error.code === 'P2025') res.status(404).json({ error: 'Provider instance filter not found' })

            Log.error(error.message, `Error updating provider instance filter for user ${req.session.user.id}`)
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
        const { instanceId } = req.query
        const { id } = req.body

        try {
            // delete provider instance
            const instance = await prisma.provider_instance_categories_filter.delete({
                where: {
                    id: Number(id),
                    provider_instances_id: Number(instanceId),
                },
            })

            Log.info(`Provider instance filter ${instance.id} deleted by ${req.session.user.id}`)
            return res.status(200).json(instance)
        } catch (error) {
            if (error.code === 'P2025') res.status(404).json({ error: 'Provider instance filter not found' })

            Log.error(error.message, `Error deleting provider instance for user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

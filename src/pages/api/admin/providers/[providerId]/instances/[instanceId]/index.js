import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'

import { validationFormatter, validationOptions } from 'src/lib/validations'
import { providerInstancesSchema } from 'src/lib/validations/providers'

const handler = nextConnect()

handler.get(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { providerId, instanceId } = req.query

        try {
            // get provider instance by id
            const instance = await prisma.provider_instances.findMany({
                where: {
                    id: Number(instanceId),
                    product_provider_id: Number(providerId),
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

handler.patch(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { name, connection_data, filter_type } = req.body
        const { instanceId, providerId } = req.query

        // validate body
        const { error } = providerInstancesSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // update provider instance
            const instance = await prisma.provider_instances.update({
                where: {
                    id: Number(instanceId),
                },
                data: {
                    name,
                    product_provider_id: Number(providerId),
                    connection_data,
                    filter_type,
                },
            })

            Log.info(`Provider instance ${instance.id} updated by user ${req.session.user.id}`)
            return res.status(200).json(instance)
        } catch (error) {
            if (error.code === 'P2025') res.status(404).json({ error: 'Provider instance not found' })

            Log.error(error.message, `Error updating provider instance for user ${req.session.user.id}`)
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
        const { instanceId, providerId } = req.query

        try {
            // delete provider instance
            const instance = await prisma.provider_instances.delete({
                where: {
                    id: Number(instanceId),
                    product_provider_id: Number(providerId),
                },
            })

            Log.info(`Provider instance ${instance.id} deleted by user ${req.session.user.id}`)
            return res.status(200).json(instance)
        } catch (error) {
            if (error.code === 'P2025') return res.status(404).json({ error: 'Provider instance not found' })

            Log.error(error.message, `Error deleting provider instance for user ${req.session.user.id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

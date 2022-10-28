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
        const { providerId } = req.query
        try {
            // get all provider instances
            const instances = await prisma.provider_instances.findMany({
                where: {
                    product_provider_id: Number(providerId),
                },
                select: {
                    id: true,
                    name: true,
                    product_provider: true,
                    filter_type: true,
                    provider_instance_categories_filter: {
                        select: {
                            product_categories_id: true,
                        },
                        where: {
                            provider_instances_id: Number(providerId),
                        },
                    },
                },
            })

            return res.status(200).json(instances)
        } catch (error) {
            Log.error(error.message, `Error getting provider instances`)
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
        const { name, connection_data, filter_type } = req.body
        const { providerId } = req.query

        // validate body
        const { error } = providerInstancesSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // create new provider instance
            const instance = await prisma.provider_instances.create({
                data: {
                    name,
                    product_provider_id: Number(providerId),
                    connection_data,
                    filter_type,
                },
            })

            Log.info(`Provider instance ${instance.id} created`)
            return res.status(200).json(instance)
        } catch (error) {
            Log.error(error.message, `Error creating new provider instance`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

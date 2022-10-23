import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import Log from 'src/lib/utils/Logger'

import { validationFormatter, validationOptions } from 'src/lib/validations'

const handler = nextConnect()

handler.get(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     *
     */
    async (req, res) => {
        const { id } = req.query

        try {
            const proxmoxProduct = await prisma.proxmox_product.findUnique({
                where: {
                    id: Number(id),
                },
                select: {
                    id: true,
                    name: true,
                    price_per_hour: true,
                    cpu_cores: true,
                    memory: true,
                    minimum_memory: true,
                    disk_size: true,
                    cpu_ballooning: true,
                    product_categories: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    proxmox_hosts: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            })
            if (!proxmoxProduct) return res.status(404).json({ error: 'Proxmox product not found' })

            return res.status(200).json(proxmoxProduct)
        } catch (error) {
            Log.error(error.message, `Error getting proxmox product by id: ${id}`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

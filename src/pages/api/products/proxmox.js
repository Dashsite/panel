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
        try {
            // get all proxmox products
            const proxmoxProducts = await prisma.proxmox_product.findMany({
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
            return res.status(200).json(proxmoxProducts)
        } catch (error) {
            Log.error(error.message, `Error fetching all proxmox products`)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

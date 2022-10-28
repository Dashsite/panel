import Log from 'src/lib/utils/Logger'
import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'

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
            // get all pterodactyl products
            const products = await prisma.pterodactyl_product.findMany({
                select: {
                    id: true,
                    name: true,
                    price_per_hour: true,
                    memory: true,
                    cpu: true,
                    disk_storage: true,
                    block_io_weight: true,
                    db_limit: true,
                    allocation_limit: true,
                    backup_limit: true,
                    product_categories: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            })
            return res.status(200).json(products)
        } catch (error) {
            Log.error(error.message, 'Error getting pterodactyl products')
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
)

export default handler

import prisma from 'src/lib/utils/PrismaClient'
import nextConnect from 'src/middleware'
import { validationFormatter, validationOptions } from 'src/lib/validations'
import { proxmoxProductSchema } from 'src/lib/validations/products'

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
            const proxmoxProducts = await prisma.proxmox_product.findMany()
            return res.status(200).json(proxmoxProducts)
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
        const {
            proxmox_hosts_id,
            product_categories_id,
            price_per_hour,
            name,
            cpu_cores,
            memory,
            minimum_memory,
            disk_size,
            cpu_ballooning,
        } = req.body

        // validate body
        const { error } = proxmoxProductSchema.validate({ ...req.body }, validationOptions)
        if (error) return res.status(400).json({ error: validationFormatter(error) })

        try {
            // create new proxmox product
            const product = await prisma.proxmox_product.create({
                data: {
                    proxmox_hosts: { connect: { id: proxmox_hosts_id } },
                    product_categories: { connect: { id: product_categories_id } },
                    price_per_hour,
                    name,
                    cpu_cores,
                    memory,
                    minimum_memory,
                    disk_size,
                    cpu_ballooning,
                },
            })
            return res.status(200).json(product)
        } catch (error) {
            //return error when in debug mode
            if (process.env.NODE_ENV === 'development') {
                console.log(error)
                return res.status(500).json({ error: error.message })
            }
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
        const { id } = req.query
        const { price_per_hour, name, cpu_cores, memory, minimum_memory, disk_size, cpu_ballooning } = req.body

        try {
            // update proxmox product by id with new data from body that is not undefined
            const proxmoxProduct = await prisma.proxmox_product.update({
                where: {
                    id: Number(id),
                },
                data: {
                    price_per_hour,
                    name,
                    cpu_cores,
                    memory,
                    minimum_memory,
                    disk_size,
                    cpu_ballooning,
                },
            })
            return res.status(200).json(proxmoxProduct)
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

import Config from 'src/lib/utils/Config'
import nextConnect from 'src/lib/utils/nextConnect'

const handler = nextConnect()

handler.get(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     */
    async (req, res) => {
        const legal = {}

        // get all legal options using iterator
        for await (const [key, value] of Config.legal.iterator()) {
            if (value.encrypted) value.value = await Config[provider].getValue(key)

            if (key.startsWith('ENABLE_')) legal[key] = value.value
        }

        return res.status(200).json(legal)
    }
)

export default handler

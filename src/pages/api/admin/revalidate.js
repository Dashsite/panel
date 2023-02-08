import nextConnect from 'src/lib/utils/nextConnect'

const handler = nextConnect()

handler.post(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     */
    async (req, res) => {
        try {
            await res.revalidate('/legal/privacy')
            await res.revalidate('/legal/terms')

            return res.status(200).json({ message: 'Revalidation successful' })
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
)

export default handler

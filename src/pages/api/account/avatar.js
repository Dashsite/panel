import nextConnect from 'src/middleware'
import formidable from 'formidable-serverless'

import prisma from 'src/lib/utils/PrismaClient'
import fs from 'fs'

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

const handler = nextConnect()

handler.post(
    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     * @returns {Promise<void>}
     */

    async (req, res) => {
        const form = formidable({})
        form.uploadDir = './public/uploads/avatars'
        form.keepExtensions = true
        form.parse(req, (err, fields, files) => {
            if (err) {
                fs.unlinkSync(path)
                return res.status(500).json()
            }

            // save image path to account db avatar url
            const path = files.image.path.replace(/\\/g, '/')
            const avatarUrl = `${process.env.APP_URL}/${path}`

            try {
                prisma.user.update({
                    where: {
                        id: req.session.user.id,
                    },
                    data: {
                        image: avatarUrl,
                    },
                })
            } catch (error) {
                // delete image from uploads folder
                fs.unlinkSync(path)

                //return error when in debug mode
                if (process.env.NODE_ENV === 'development') {
                    return res.status(500).json({ error: error.message })
                }
                return res.status(500).json({ error: 'Internal server error' })
            }

            res.setHeader('Location', avatarUrl).status(201).end()
        })
    }
)

export default handler

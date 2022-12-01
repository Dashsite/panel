import fs from 'fs'
import formidable from 'formidable-serverless'
import jimp from 'jimp'

import Log from 'src/lib/utils/Logger'
import nextConnect from 'src/middleware'
import prisma from 'src/lib/utils/PrismaClient'

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
        form.parse(req, async (err, fields, files) => {
            if (err) {
                fs.unlinkSync(path)
                Log.error(err.message, 'Error uploading avatar')
                return res.status(500).json()
            }

            const path = files.image.path.replace(/\\/g, '/')

            const image = await jimp.read(path)
            await image.resize(250, jimp.AUTO)
            await image.writeAsync(path)

            const avatarUrl = `${process.env.APP_URL}/${path.replace('public/', '')}`

            try {
                const user = await prisma.user.update({
                    where: {
                        id: req.session.user.id,
                    },
                    data: {
                        image: avatarUrl,
                    },
                })
                console.log(user)
            } catch (error) {
                // delete image from uploads folder
                fs.unlinkSync(path)

                Log.error(error.message, 'Error updating avatar url')
                return res.status(500).json({ error: 'Internal server error' })
            }

            Log.info(`Avatar updated for user ${req.session.user.id}`)
            res.setHeader('Location', avatarUrl).status(201).end()
        })
    }
)

export default handler

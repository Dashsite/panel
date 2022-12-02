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
        const form = formidable({
            maxFileSize: 8 * 1024 * 1024,
            uploadDir: './public/uploads/avatars',
            keepExtensions: true,
        })

        form.on('fileBegin', (name, file) => {
            // check mimetype png or jpg if not return an formidable error
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                form.emit('error', new Error('File type is not supported'))
            }
        })

        form.on('error', err => {
            if (err.message === 'File type is not supported') {
                return res.status(400).json({ error: err.message })
            }
            if (err.message === 'Image size is too large') {
                return res.status(400).json({ error: err.message })
            }
            if (err.message.startsWith('maxFileSize exceeded')) {
                return res.status(400).json({ error: 'Image size is too large' })
            }
            return res.status(500).end()
        })

        form.parse(req, async (err, fields, files) => {
            if (err) {
                // An error occurred when uploading, do not parse
                // Errors are handled in the form.on('error') event
                return
            }
            const path = files.image.path.replace(/\\/g, '/')
            const avatarUrl = `${process.env.APP_URL}/${path.replace('public/', '')}`

            try {
                const image = await jimp.read(path)
                await image.resize(250, jimp.AUTO)
                await image.writeAsync(path)

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

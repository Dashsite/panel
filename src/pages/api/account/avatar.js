import nextConnect from 'src/lib/utils/nextConnect'
import formidable from 'formidable-serverless'

import prisma from 'src/lib/utils/PrismaClient'
import { uuid } from 'uuidv4'
import fs from 'fs'
import { getToken } from 'next-auth/jwt'

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
        const token = await getToken({ req })

        const form = new formidable.IncomingForm()
        form.uploadDir = './public/uploads/avatars'
        form.keepExtensions = true
        form.parse(req, async (err, fields, files) => {
            if (err) {
                fs.unlinkSync(path)

                return res.status(500).json()
            }

            // save image path to account db avatar url
            const { path } = files.image

            console.log(path)

            // concat app url to image path
            const avatarUrl = `${process.env.APP_URL}/${path}`

            try {
                await prisma.user.update({
                    where: {
                        id: token.user.id,
                    },
                    data: {
                        image: avatarUrl,
                    },
                })
            } catch (error) {
                // delete image from uploads folder
                fs.unlinkSync(path)
                res.status(500).json()
            }

            res.setHeader('Location', avatarUrl).status(201).end()
        })
    }
)

export default handler

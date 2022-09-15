import prisma from 'src/lib/utils/PrismaClient'
import { uuid } from 'uuidv4'
import { fs } from 'fs'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 * @returns {Promise<void>}
 */
export default async (req, res) => {
    // Update user avatar image
    const { body, method } = req
    if (method !== 'PATCH') return res.status(405).end()

    try {
        console.log(body)

        const imageName = uuid()
        // get image file ending from html request
        const imageEnding = image.split(';')[0].split('/')[1]
        const imageFileName = `${imageName}.${imageEnding}`

        const imagePath = `public/uploads/avatars/${imageFileName}`

        const base64Data = image.replace(/^data:image\/png;base64,/, '')
        await fs.writeFile(imagePath, base64Data, 'base64')

        // // update user avatar image
        // const updatedUser = await prisma.user.update({
        //     where: {
        //         id: token.id,
        //     },
        //     data: {
        //         image,
        //     },
        // })

        res.status(200).json({ image: imagePath })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

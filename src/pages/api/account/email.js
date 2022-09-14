import prisma from 'src/lib/utils/PrismaClient'

export default async (req, res) => {
    // Update Email Address
    const {
        body: { token, email, password },
        method,
    } = req
    if (method !== 'PUT') return res.status(405).end()

    try {
        // Check if any user has this email address
        const user = await prisma.user.findUnique({
            where: { email },
        })
        if (user) return res.status(400).json({ error: 'Email address is already in use.' })

        // update user email address
        const updatedUser = await prisma.user.update({
            where: {
                id: token.id,
            },
            data: {
                email: email,
            },
        })

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

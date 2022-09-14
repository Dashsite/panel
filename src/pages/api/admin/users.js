import prisma from 'src/lib/utils/PrismaClient'

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            // get all users from db without password
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    disabled: true,
                    email: true,
                    emailVerified: true,
                    image: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            })
            res.status(200).json(users)

            break
    }
}

import prisma from 'src/lib/utils/PrismaClient'

export default async (req, res) => {
    console.log('GET')
    const { token, password } = req.body
    if (!(token && password)) throw new Error()

    const resetToken = await prisma.resetToken.findUnique({
        where: {
            token: token,
        },
    })
    switch (req.method) {
        case 'GET':
            // get user from auth token
            // return userdata from db

            break
    }
}

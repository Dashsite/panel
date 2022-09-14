export default async (req, res) => {
    const {
        query: { id, name, email },
        method,
    } = req

    switch (method) {
        case 'GET':
            // Get user by id or email from db
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            })
            res.status(200).json(user)

            break
        case 'PUT':
            // Update or create data in your database
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

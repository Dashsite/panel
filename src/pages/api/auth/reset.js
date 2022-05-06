import bcrypt from 'bcrypt'
import { getToken } from 'next-auth/jwt'

import prisma from 'src/lib/utils/PrismaClient'
import { resetSchema } from 'src/lib/validations/user'

const secret = process.env.NEXTAUTH_SECRET

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()
  const token = await getToken({ req, secret })
  if (!(token && !token.user.disabled)) return res.status(401).end()

  const password = req.body.password

  try {
    const { error } = resetSchema.validate({ password }, { abortEarly: false, errors: { wrap: true } })
    if (error) return res.status(400).json({ error: error.message })

    const passwordHash = await bcrypt.hash(password, 9)
    await prisma.user.update({
      where: { id: token.user.id },

      data: {
        password: passwordHash,
        updatedAt: new Date()
      }
    })

    return res.status(200).end()
  } catch (err) {
    return res.status(500).end()
  }
}

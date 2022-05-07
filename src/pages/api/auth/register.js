import bcrypt from 'bcrypt'
import prisma from 'src/lib/utils/PrismaClient'
import { registerSchema } from 'src/lib/validations/user'

/**
 * Register a new user with the provided email and password
 */
export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, email, password } = req.body

  try {
    // validate the data using the schema in src/lib/validations/user.js
    const { error } = registerSchema.validate(
      { username, email, password },
      { abortEarly: false, errors: { wrap: true } }
    )
    if (error) return res.status(400).json({ error: error.message })

    const passwordHash = await bcrypt.hash(password, 9)
    await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    return res.status(200).end()
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'Email already exists' })

    return res.status(500).end()
  }
}

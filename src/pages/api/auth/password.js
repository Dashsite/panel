import bcrypt from 'bcrypt'
import { getToken } from 'next-auth/jwt'
import { nanoid } from 'nanoid'
import router from 'next/router'

import sendMail from 'src/lib/utils/Nodemailer'

import prisma from 'src/lib/utils/PrismaClient'
import { resetSchema } from 'src/lib/validations/user'

const secret = process.env.NEXTAUTH_SECRET

const resetPassword = async (req, res) => {
  const token = await getToken({ req, secret })
  if (!(token && !token.user.disabled)) return res.status(401).end()

  const password = req.body.password

  try {
    const { error } = resetSchema.validate({ password }, { abortEarly: false, errors: { wrap: true } })

    if (error) throw { status: 400, message: error.message }

    const passwordHash = await bcrypt.hash(password, 9)
    await prisma.user.update({
      where: { id: token.user.id },

      data: {
        password: passwordHash,
        updatedAt: new Date()
      }
    })
  } catch (err) {
    throw err
  }
}

const resetPasswordRequest = async (email, url) => {
  const resetToken = nanoid(48)
  try {
    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) return

    // create resetToken and send email
    const resetTokenDB = await prisma.resetToken.create({
      data: {
        identifier: email,
        token: resetToken,
        expires: new Date(Date.now() + 10 * 60 * 1000) // expires in 10 mnutes
      }
    })

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset?token=${resetToken}`
    const subject = 'Reset your password'
    const text = `
    To reset your password, please click the following link:
    ${resetUrl}
  `
    const html = `
    <p>To reset your password, please click the following link:</p>
    <a href="${resetUrl}">${resetUrl}</a>
  `

    await sendMail(email, subject, text, html)
  } catch (err) {
    throw err
  }
}

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      await resetPassword(req, res)

      return res.status(200).end()
    } catch (err) {
      if (err.status === 400) return res.status(400).json({ message: err.message })

      return res.status(500).end()
    }
  }
  if (req.method === 'PUT') {
    try {
      await resetPasswordRequest(req.body.email)

      return res.status(200).end()
    } catch (err) {
      console.log(err)

      return res.status(500).end()
    }
  }

  if (req.method === 'GET') {
    const resetToken = req.query.token
    if (!resetToken) return res.status(400).end()

    //check if resetToken is valid and not expired
    const resetTokenDB = await prisma.resetToken.findUnique({
      where: {
        token: resetToken
      }
    })

    if (!resetTokenDB || resetTokenDB.expires < new Date()) return res.status(401).end()

    return res.status(200).end()
  }

  return res.status(405).end()
}

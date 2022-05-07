import bcrypt from 'bcrypt'
import { compile } from 'joi'
import { nanoid } from 'nanoid'

import sendMail from 'src/lib/utils/Nodemailer'

import prisma from 'src/lib/utils/PrismaClient'
import { resetSchema } from 'src/lib/validations/user'

/**
 * Set new Password for a user
 * @param {object} req
 * @description Token in query is required to reset password. If token is valid, user can set new password.
 *
 */
const resetPassword = async req => {
  const { token, password } = req.body
  if (!(token && password)) throw new Error()

  const resetToken = await prisma.resetToken.findUnique({
    where: {
      token: token
    }
  })
  if (resetToken.expires < new Date()) return false

  const email = resetToken.identifier

  try {
    const { error } = resetSchema.validate({ password }, { abortEarly: false, errors: { wrap: true } })

    if (error) return { status: 400, message: error.message }

    const passwordHash = await bcrypt.hash(password, 9)
    await prisma.user.update({
      where: { email },

      data: {
        password: passwordHash,
        updatedAt: new Date()
      }
    })

    await prisma.resetToken.deleteMany({
      where: {
        identifier: email
      }
    })
  } catch (err) {
    return false
  }
}

/**
 * Creates a resetToken and sends an email to the user
 * @param {string} email - email of the user
 * @returns
 */
const resetPasswordRequest = async email => {
  const resetToken = nanoid(48)
  try {
    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) return false

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

    return true
  } catch (err) {
    throw false
  }
}

export default async (req, res) => {
  // POST Request - Sets a new password for a user and deletes all resetTokens for that user
  if (req.method === 'POST') {
    const result = await resetPassword(req, res)

    if (result.status === 400) return res.status(400).json({ error: err.message })

    return result ? res.status(200).end() : res.status(500).end()
  }

  // PUT Request - Creates a new resetToken and sends an email to the user
  if (req.method === 'PUT') {
    const result = await resetPasswordRequest(req.body.email)

    return result ? res.status(200).end() : res.status(500).end()
  }

  // GET Request - Checks if a resetToken is valid and not expired
  if (req.method === 'GET') {
    const resetToken = req.query.token
    if (!resetToken) return res.status(400).end()

    const resetTokenDB = await prisma.resetToken.findUnique({
      where: {
        token: resetToken
      }
    })

    if (!resetTokenDB) return res.status(401).end()

    // Check if token is expired - if so, delete it
    if (resetTokenDB.expires < new Date()) {
      await prisma.resetToken.delete({
        where: {
          identifier: resetTokenDB.identifier
        }
      })

      return res.status(401).end()
    }

    return res.status(200).end()
  }

  return res.status(405).end()
}

import Log from 'src/lib/utils/Logger'
import sendMail from 'src/lib/utils/Nodemailer'
import prisma from 'src/lib/utils/PrismaClient'
import { v4 } from 'uuid'

// create a new verification token for a user which expires in 20 minutes
export const createVerificationToken = async email => {
    const token = await prisma.verificationToken.create({
        data: {
            identifier: email,
            token: v4(),
            expires: new Date(Date.now() + 20 * 60 * 1000),
        },
    })

    return token
}

/**
 *
 * @param {string} key A Token or Email
 * @returns {Promise<import('@prisma/client').VerificationToken | false>} A promise that resolves to the verification token or false if not found.
 */
export const findVerificationToken = async key => {
    // search for a verification token by its token value or email
    const verificationToken = await prisma.verificationToken.findFirst({
        where: {
            OR: [
                {
                    token: key,
                },
                {
                    identifier: key,
                },
            ],
        },
    })

    console.log(verificationToken)

    if (!verificationToken) return false
    if (verificationToken.expires < new Date()) {
        deleteVerificationToken(verificationToken.token)
        return false
    }

    return verificationToken
}

// delete a verification token by its token value
export const deleteVerificationToken = async token => {
    const verificationToken = await prisma.verificationToken.delete({
        where: {
            token,
        },
    })

    return verificationToken
}

// send the verification email
export const sendVerificationEmail = async (user, token) => {
    const { token: verificationToken } = token

    const url = `${process.env.NEXTAUTH_URL}/auth/verify?token=${verificationToken}`

    const message = {
        email: user.email,
        subject: 'Verify your email address',
        text: `Please verify your email address by clicking the link below: ${url}`,
        html: `<body style="background: #f9f9f9;">
        <table width="100%" border="0" cellspacing="20" cellpadding="0"
          style="background: #fff; max-width: 600px; margin: auto; border-radius: 10px;">
          <tr>
            <td align="center"
              style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: #444;">
              Sign in to <strong>${process.env.NEXTAUTH_URL}</strong>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 5px;" bgcolor="#346df1"><a href="${url}"
                      target="_blank"
                      style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid #346df1; display: inline-block; font-weight: bold;">Sign
                      in</a></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center"
              style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: #444;">
              If you did not request this email you can safely ignore it.
            </td>
          </tr>
        </table>
      </body>`,
    }

    try {
        await sendMail(message)
    } catch (error) {
        Log.error(error)
    }
}

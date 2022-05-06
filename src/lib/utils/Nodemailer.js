import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '1ea393d13c711a',
    pass: '4f356815afbe06'
  }
})

const sendMail = async (email, subject, text, html) => {
  new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.EMAIL_FROM,
        to: email,
        subject,
        text,
        html
      },
      (err, info) => {
        if (err) reject(err)
        resolve(info)
      }
    )
  })
}

export default sendMail

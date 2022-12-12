import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
})

/**
 * Send an email using the nodemailer transporter.
 * @param {string} email
 * @param {string} subject
 * @param {string} text
 * @param {string} html
 * @returns {Promise} A promise that resolves when the email is sent.
 */
const sendMail = async ({ email, subject, text, html }) =>
    new Promise((resolve, reject) => {
        transporter.sendMail(
            {
                from: process.env.EMAIL_FROM,
                to: email,
                subject,
                text,
                html,
            },
            (err, info) => {
                if (err) reject(err)
                resolve(info)
            }
        )
    })

export default sendMail

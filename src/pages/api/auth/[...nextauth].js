import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import prisma from 'src/lib/utils/PrismaClient'

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            id: 'verify',
            name: 'verify',
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    })

                    if (!user) return null
                    const res = await confirmPasswordHash(credentials.password, user.password)
                    if (res === true) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            role: user.role,
                        }
                    } else {
                        return null
                    }
                } catch (err) {
                    return null
                }
            },
        }),
    ],
    events: {
        createUser: async ({ user }) => {
            await prisma.user.update({
                where: {
                    id: user.id,
                },

                // Add Custom User fields at user creation
                data: {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    disabled: false,
                },
            })
        },
    },
    jwt: { encryption: true },
    callbacks: {
        jwt: async ({ token, user }) => {
            user &&
                (token.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                })

            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user

            return session
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    pages: {
        signIn: '/auth/login',
        verifyRequest: '/auth/verify',
    },
})

const confirmPasswordHash = (plainPassword, hashedPassword) => {
    return new Promise(resolve => {
        bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
            resolve(res)
        })
    })
}

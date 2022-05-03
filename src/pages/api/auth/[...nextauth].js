import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import prisma from 'src/lib/utils/PrismaClient'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!user) return null

          //Compare the hash
          const res = await confirmPasswordHash(credentials.password, user.password)
          if (res === true) {
            return {
              id: user.id,
              name: user.name,
              image: user.image,
              email: user.email
            }
          } else {
            return null
          }
        } catch (err) {
          return null
        }
      }
    })
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: '/pages/login'
  },
  events: {
    createUser: async ({ user }) => {
      await prisma.user.update({
        where: {
          id: user.id
        },

        // Add Custom User fields at user creation
        data: {
          createdAt: new Date(),
          updatedAt: new Date(),
          disabled: false
        }
      })
    }
  },
  callbacks: {
    signIn: async ({ user }) => {
      try {
        if (!user) return false
        if (user.disabled) return false

        return user
      } catch (err) {
        console.log('Signin callback error:', err)
      }
    }
  }
})

const confirmPasswordHash = (plainPassword, hashedPassword) => {
  return new Promise(resolve => {
    bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
      resolve(res)
    })
  })
}

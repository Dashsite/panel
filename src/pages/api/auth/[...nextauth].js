import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: '/pages/login'
  },
  events: {
    createUser: async ({ user }) => {
      console.log(user)

      // add additional user fields here to db
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          createdAt: new Date(),
          updatedAt: new Date(),
          disabled: false
        }
      })
    }
  }
})

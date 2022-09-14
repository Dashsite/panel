import { TimerLockOpen } from 'mdi-material-ui'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            const urlPath = req.nextUrl.pathname

            if (isAdminRoute(urlPath)) {
                return token?.role === 'admin'
            }
            if (isUserRoute(urlPath)) {
                return !!token
            }
        },
    },
})

const isAdminRoute = URL => {
    return adminRoutes.some(route => URL.startsWith(route))
}

const isUserRoute = URL => {
    return userRoutes.some(route => URL.startsWith(route))
}

const userRoutes = ['/api/auth', '/api/user']
const adminRoutes = ['/api/admin', '/admin']

export const config = { matcher: ['/api/auth/register', '/api/admin', '/api/user'] }

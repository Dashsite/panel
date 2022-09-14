import { withAuth } from 'next-auth/middleware'

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default async req => {
    const pathname = req.nextUrl.pathname

    // if its an admin or user route use withAuth
    if (isAdminRoute(pathname) || isUserRoute(pathname)) {
        return withAuth({
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
        })(req)
    }
}

const isAdminRoute = URL => {
    return adminRoutes.some(route => URL.startsWith(route))
}

const isUserRoute = URL => {
    return userRoutes.some(route => URL.startsWith(route))
}

const userRoutes = ['/api/auth', '/api/user']
const adminRoutes = ['/api/admin', '/admin']

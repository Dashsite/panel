import { unstable_getServerSession } from 'next-auth/next'
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async (req, res, next) => {
    const pathname = req.url

    // if its an admin or user route check for authentication
    if (isAdminRoute(pathname) || isUserRoute(pathname)) {
        // get the user session
        const session = await unstable_getServerSession(req, res, nextAuthOptions)

        if (!session) {
            return res.redirect('/auth/login')
        }

        // if user is not admin and is trying to access admin route redirect to home with 403
        if (isAdminRoute(pathname) && !session.role === 'admin') {
            return res.redirect('/auth/login').status(403)
        }

        // append the user session to the request object for use in the route
        req.session = session
    }

    return next()
}

const isAdminRoute = URL => {
    return adminRoutes.some(route => URL.startsWith(route))
}

const isUserRoute = URL => {
    return userRoutes.some(route => URL.startsWith(route))
}

const userRoutes = ['/api/account']
const adminRoutes = ['/api/admin', '/admin']

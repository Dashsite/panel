// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import CogOutline from 'mdi-material-ui/CogOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

/**
 * Function that returns the navigation items.
 * @returns {Array} An array of menu items.
 */
const UserNavigation = role => {
    const userNavigation = [
        {
            title: 'Home',
            icon: HomeOutline,
            path: '/',
        },
        {
            sectionTitle: 'User',
        },
        {
            title: 'Login',
            icon: Login,
            path: '/auth/login',
            openInNewTab: false,
        },
        {
            title: 'Register',
            icon: AccountPlusOutline,
            path: '/auth/register',
            openInNewTab: false,
        },
    ]

    const adminNavigation = [
        {
            sectionTitle: 'Admin Area',
        },
        {
            title: 'Settings',
            icon: CogOutline,
            path: '/admin/settings',
        },
        {
            title: 'Products',
            icon: Table,
            path: '/admin/products',
        },
        {
            title: 'Users',
            icon: Table,
            path: '/admin/users',
        },
        {
            sectionTitle: 'Demo',
        },
        {
            title: 'Typography',
            icon: FormatLetterCase,
            path: '/demo/typography',
        },
        {
            title: 'Icons',
            path: '/demo/icons',
            icon: GoogleCirclesExtended,
        },
        {
            title: 'Cards',
            icon: CreditCardOutline,
            path: '/demo/cards',
        },
        {
            title: 'Tables',
            icon: Table,
            path: '/demo/tables',
        },
        {
            icon: CubeOutline,
            title: 'Form Layouts',
            path: '/demo/form-layouts',
        },
    ]

    if (role === 'admin') {
        return [...userNavigation, ...adminNavigation]
    }

    return userNavigation
}

export default UserNavigation

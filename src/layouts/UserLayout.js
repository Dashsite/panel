// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/views/navigation/vertical'

// ** Component Import
import VerticalAppBarContent from 'src/components/vertical/AppBarContent'
import { useSession } from 'next-auth/react'

const UserLayout = ({ children }) => {
    const { data, status } = useSession()
    /**
     *  The below variable will hide the current layout menu at given screen size.
     *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
     *  You can change the screen size from which you want to hide the current layout menu.
     *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
     *  to know more about what values can be passed to this hook.
     *  ! Do not change this value unless you know what you are doing. It can break the template.
     */
    const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

    const verticalNavItems = data?.user?.role === 'admin' ? VerticalNavItems('admin') : VerticalNavItems('user')

    return (
        <VerticalLayout
            hidden={hidden}
            verticalNavItems={verticalNavItems} // Navigation Items
            verticalAppBarContent={(
                props // AppBar Content
            ) => <VerticalAppBarContent hidden={hidden} toggleNavVisibility={props.toggleNavVisibility} />}
        >
            {children}
        </VerticalLayout>
    )
}

export default UserLayout

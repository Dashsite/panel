// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

const FooterContent = () => {
    const [footerPages, setFooterPages] = useState({
        ENABLE_TOS: false,
        ENABLE_PRIVACY_POLICY: false,
    })

    useEffect(() => {
        const getLegalPages = async () => {
            const res = await fetch('/api/webLayout/footer')
            const footerPages = await res.json()
            setFooterPages(footerPages)
        }
        getLegalPages()
    }, [])

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ mr: 2 }}>© {new Date().getFullYear()} - Copyright by Name</Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
                {footerPages.ENABLE_TOS && <Link href='/legal/terms'>Terms of Service</Link>}
                {footerPages.ENABLE_PRIVACY_POLICY && <Link href='/legal/privacy'>Privacy Policy</Link>}
            </Box>
        </Box>
    )
}

export default FooterContent

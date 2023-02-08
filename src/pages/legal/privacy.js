import { useRef } from 'react'
import { Box, Typography } from '@mui/material'
import Config from 'src/lib/utils/Config'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import LogoHeader from 'src/components/LogoHeader'

const Privacy = ({ content }) => {
    return (
        <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
            <LogoHeader />
            <Typography variant='h3'>Privacy Policy</Typography>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </Box>
    )
}

Privacy.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Privacy

export const getStaticProps = async () => {
    const content = await Config.legal.get('PRIVACY_POLICY_CONTENT')

    return {
        props: {
            content: content.value,
        },
    }
}

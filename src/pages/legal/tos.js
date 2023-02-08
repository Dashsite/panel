import { Box, Typography } from '@mui/material'
import Config from 'src/lib/utils/Config'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const TOS = ({ content }) => {
    return (
        <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
            <LogoHeader />
            <Typography variant='h3'>Terms of Service</Typography>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </Box>
    )
}

TOS.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default TOS

export const getStaticProps = async () => {
    const content = await Config.legal.get('TOS_CONTENT')

    return {
        props: {
            content: content.value,
        },
    }
}

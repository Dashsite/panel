import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import themeConfig from 'src/configs/themeConfig'

const LogoHeader = () => (
  <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Link passHref href='/'>
      <img alt='Logo' src='/images/Dashsite_logo.png' width={80} />
    </Link>
    <Typography
      variant='h6'
      sx={{
        ml: 3,
        lineHeight: 1,
        fontWeight: 600,
        textTransform: 'uppercase',
        fontSize: '1.5rem !important'
      }}
    >
      {themeConfig.templateName}
    </Typography>
  </Box>
)

export default LogoHeader

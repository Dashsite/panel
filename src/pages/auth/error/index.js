import { useRouter } from 'next/router'
import { Alert, Box, Button, Typography, CardContent, Card as MuiCard } from '@mui/material'

import { styled } from '@mui/material/styles'

import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { FooterIllustration, LogoHeader } from 'src/views/auth'
import { useSession } from 'next-auth/react'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const AuthErrorPage = ({ errorMessage }) => {
  const router = useRouter()

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <LogoHeader />
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>

            <Alert severity='error' sx={{ mt: 8 }}>
              {errorMessage}
            </Alert>
          </Box>
          <Box>
            <Button
              variant='contained'
              color='primary'
              sx={{
                mt: 3,
                width: '100%',
                fontWeight: 600,
                fontSize: '1rem !important'
              }}
              href='/dashboard'
            >
              Go to Dashboard
            </Button>
          </Box>
        </CardContent>
      </Card>
      <FooterIllustration />
    </Box>
  )
}
AuthErrorPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default AuthErrorPage

export async function getServerSideProps(context) {
  const { error } = context.query
  let errorMessage

  switch (error) {
    case 'AccessDenied':
      errorMessage = 'You are not allowed to login or access this page.'
      break
    case 'Verification':
      errorMessage = 'Your verification token has expired or has already been used.'
      break
    default:
      errorMessage = 'An unknown error has occurred.'
      break
  }

  return {
    props: {
      errorMessage
    }
  }
}

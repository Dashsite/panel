import { useState } from 'react'
import router from 'next/router'
import Link from 'next/link'
import { getProviders } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { Alert, Box, Button, Collapse, Divider, Typography, CardContent, Card as MuiCard } from '@mui/material'
import { styled } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/auth/FooterIllustration'
import { RegisterForm, OAuthSignIn, LogoHeader } from 'src/views/auth'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const RegisterPage = ({ providers }) => {
  const { status } = useSession()
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  if (status === 'authenticated') {
    return (
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <LogoHeader />
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Welcome to {themeConfig.templateName}! 👋🏻
              </Typography>

              <Alert severity='success' sx={{ mt: 8 }}>
                You are already logged in!
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
                onClick={() => router.push('/')}
              >
                Go to Dashboard
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    )
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <LogoHeader />
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Adventure starts here 🚀
            </Typography>
          </Box>

          <Collapse mountOnEnter in={showSuccess} timeout='auto'>
            <Alert severity='success'>Registration successful! Please check your email to verify your account.</Alert>
          </Collapse>

          <Collapse unmountOnExit onExited={() => setShowSuccess(true)} in={!registerSuccess} timeout='auto'>
            <RegisterForm providers={providers} successHandler={setRegisterSuccess} />
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/login'>
                  <LinkStyled>Sign in instead</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}>or</Divider>
            <OAuthSignIn providers={providers} />
          </Collapse>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: { providers }
  }
}

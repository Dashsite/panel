import { useState } from 'react'
import Link from 'next/link'
import router from 'next/router'
import { getProviders, signIn } from 'next-auth/react'
import { Alert, Box, Collapse, Divider, Typography, CardContent, Card as MuiCard } from '@mui/material'
import { styled } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { RegisterForm, OAuthSignIn } from 'src/views/auth'

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
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
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

export async function getServerSideProps(context) {
  const providers = await getProviders()

  return {
    props: { providers }
  }
}

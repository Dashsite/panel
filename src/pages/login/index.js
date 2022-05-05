import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Alert,
  AlertTitle,
  Box,
  List,
  ListItem,
  Button,
  Divider,
  TextField,
  InputLabel,
  Typography,
  IconButton,
  CardContent,
  FormControl,
  OutlinedInput,
  Card as MuiCard,
  InputAdornment,
  FormControlLabel as MuiFormControlLabel
} from '@mui/material'

import { styled, useTheme } from '@mui/material/styles'

import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { getProviders, signIn, useSession } from 'next-auth/react'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = ({ providers }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showError, setShowError] = useState(false)
  const { status } = useSession()

  const handleLogin = async () => {
    setShowError(false)

    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: `${window.location.origin}/dashboard`,
      redirect: false
    })

    console.log('Result:', result)

    if (result.error) setShowError(true)
  }

  if (status === 'authenticated') {
    return (
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img alt='Logo' src='/images/Dashsite_logo.png' width={80} />
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
                href='/dashboard'
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
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img alt='Logo' src='/images/Dashsite_logo.png' width={80} />
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
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>
            {!(status === 'authenticated') && (
              <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
            )}
          </Box>
          {showError && (
            <Alert severity='error' sx={{ marginBottom: 8 }}>
              <AlertTitle>Error</AlertTitle>
              {/* Login Error wrong */}
              Email or password is incorrect. Please check your credentials and try again.
            </Alert>
          )}
          <form
            onSubmit={e => {
              e.preventDefault()
              handleLogin()
            }}
          >
            <TextField
              fullWidth
              type='email'
              label='Email'
              value={email}
              sx={{ marginBottom: 4 }}
              onChange={event => setEmail(event.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={password}
                id='auth-login-password'
                onChange={event => setPassword(event.target.value)}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label='toggle password visibility'
                    >
                      {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 3, mt: 3, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'right' }}
            >
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            {/* // make button default enter key */}
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              disabled={!(email && password)}
              type='submit'
            >
              Login
            </Button>
          </form>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ marginRight: 2 }}>
              New on our platform?
            </Typography>
            <Typography variant='body2'>
              <Link passHref href='/pages/register'>
                <LinkStyled>Create an account</LinkStyled>
              </Link>
            </Typography>
          </Box>
          <Divider sx={{ my: 5 }}>or</Divider>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link> */}
            <Link href='/' passHref>
              <IconButton component='a' onClick={() => signIn(providers['google'].id)}>
                <Google sx={{ color: '#db4437' }} />
              </IconButton>
            </Link>
          </Box>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage

export async function getServerSideProps(context) {
  const providers = await getProviders()

  return {
    props: { providers }
  }
}

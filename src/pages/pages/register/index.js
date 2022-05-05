import { useState, Fragment } from 'react'
import Link from 'next/link'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  Checkbox,
  TextField,
  Typography,
  InputLabel,
  IconButton,
  CardContent,
  List,
  ListItem,
  FormControl,
  OutlinedInput,
  Card as MuiCard,
  InputAdornment,
  FormControlLabel as MuiFormControlLabel
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { getProviders, signIn } from 'next-auth/react'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = ({ providers }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false)
  const [error, setError] = useState('')

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleRegister = async () => {
    if (!username || !email || !password || !isPrivacyChecked) return
    if (password !== passwordConfirm) {
      setError('Passwords do not match')

      return
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
    if (response.status === 200) {
      signIn('credentials', { email, password, callbackUrl: `${window.location.origin}/dashboard`, redirect: false })

      return
    }

    const jsonResponse = await response.json()
    if (response.status === 400) setError(jsonResponse.error)
    if (response.status === 409) setError('Email already in use')
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
              Adventure starts here 🚀
            </Typography>
          </Box>
          {error && (
            <Alert severity='error' sx={{ marginBottom: 4 }}>
              <AlertTitle>Error</AlertTitle>
              <List>
                {error.split('. ').map((string, index) => (
                  <ListItem dense disableGutters key={index}>
                    • {string}.
                  </ListItem>
                ))}
              </List>
            </Alert>
          )}
          <TextField
            autoFocus
            fullWidth
            id='username'
            label='Username'
            value={username}
            sx={{ marginBottom: 4 }}
            onChange={event => setUsername(event.target.value)}
          />
          <TextField
            fullWidth
            type='email'
            label='Email'
            value={email}
            sx={{ marginBottom: 4 }}
            onChange={event => setEmail(event.target.value)}
          />
          <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
            <OutlinedInput
              label='Password'
              value={password}
              id='auth-register-password'
              onChange={event => setPassword(event.target.value)}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    {showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-register-password'>Confirm Password</InputLabel>
            <OutlinedInput
              label='ConfirmPassword'
              value={passwordConfirm}
              id='auth-register-password'
              onChange={() => setPasswordConfirm(event.target.value)}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    {showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={isPrivacyChecked} onChange={() => setIsPrivacyChecked(!isPrivacyChecked)} />}
            label={
              <Fragment>
                <span>I agree to </span>
                <Link href='/' passHref>
                  <LinkStyled onClick={e => e.preventDefault()}>Privacy policy & Terms</LinkStyled>
                </Link>
              </Fragment>
            }
          />
          <Button
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            disabled={!(isPrivacyChecked && username && email && password && passwordConfirm)}
            sx={{ marginBottom: 7 }}
            onClick={handleRegister}
          >
            Sign up
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ marginRight: 2 }}>
              Already have an account?
            </Typography>
            <Typography variant='body2'>
              <Link passHref href='/pages/login'>
                <LinkStyled>Sign in instead</LinkStyled>
              </Link>
            </Typography>
          </Box>
          <Divider sx={{ my: 5 }}>or</Divider>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage

export async function getServerSideProps(context) {
  const providers = await getProviders()

  return {
    props: { providers }
  }
}

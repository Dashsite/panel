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

const VerifyEmailPage = ({ providers }) => {
  const [email, setEmail] = useState('')
  const { status } = useSession()

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
              Registration successful! Please check your email to verify your account.
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
VerifyEmailPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default VerifyEmailPage

export async function getServerSideProps(context) {
  const providers = await getProviders()

  return {
    props: { providers }
  }
}

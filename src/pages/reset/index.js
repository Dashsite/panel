import router from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { Alert, Box, Collapse, Typography, CardContent, Card as MuiCard } from '@mui/material'
import { styled } from '@mui/material/styles'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/auth/FooterIllustration'
import { getProviders, useSession } from 'next-auth/react'
import { ResetForm, LogoHeader } from 'src/views/auth'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const ResetPage = () => {
  const { data, status } = useSession()
  const [showSuccess, setShowSuccess] = useState(false)

  if (!status === 'authenticated') {
    console.log(data)

    return
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <LogoHeader />

          <Box sx={{ mb: 0 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Password Reset ♻️
            </Typography>
            <Collapse mountOnEnter in={showSuccess} timeout='auto'>
              <Alert severity='success'>Please check your email to reset your password.</Alert>
            </Collapse>
          </Box>

          {status === 'authenticated' ? (
            <Collapse in={!showSuccess}>
              <Typography variant='body2' sx={{ mb: 6 }}>
                Enter your new password below.
              </Typography>

              <ResetForm passwordReset successHandler={setShowSuccess} />
            </Collapse>
          ) : (
            <Collapse in={!showSuccess}>
              <Typography variant='body2' sx={{ mb: 6 }}>
                Enter your email address and we'll send you a link to reset your password.
              </Typography>

              <ResetForm successHandler={setShowSuccess} />
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: 2 }}>
                  Remember your password?
                </Typography>
                <Typography variant='body2'>
                  <Link passHref href='/login'>
                    <LinkStyled>Login instead</LinkStyled>
                  </Link>
                </Typography>
              </Box>
            </Collapse>
          )}
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
ResetPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ResetPage

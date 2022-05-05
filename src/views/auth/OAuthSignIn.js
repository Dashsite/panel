import { Box, Typography, Divider, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import Google from 'mdi-material-ui/Google'

import { getProviders, signIn } from 'next-auth/react'

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const OAuthSignIn = () => {
  return (
    <>
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
    </>
  )
}

export default OAuthSignIn

export async function getServerSideProps(context) {
  const providers = await getProviders()

  return {
    props: { providers }
  }
}

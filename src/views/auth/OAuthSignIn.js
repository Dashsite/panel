import { Box, IconButton } from '@mui/material'
import Link from 'next/link'
import Google from 'mdi-material-ui/Google'

import { signIn } from 'next-auth/react'

const OAuthSignIn = ({ providers }) => {
  return (
    <>
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

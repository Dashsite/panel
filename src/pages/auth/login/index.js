import router from 'next/router'
import Link from 'next/link'
import { Alert, Box, Button, Divider, Typography, CardContent, Card as MuiCard } from '@mui/material'
import { styled } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/auth/FooterIllustration'
import { getProviders, useSession } from 'next-auth/react'
import { OAuthSignIn, LoginForm, LogoHeader } from 'src/views/auth'

const Card = styled(MuiCard)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: '28rem' },
}))

const LinkStyled = styled('a')(({ theme }) => ({
    fontSize: '0.875rem',
    textDecoration: 'none',
    color: theme.palette.primary.main,
}))

const LoginPage = ({ providers }) => {
    const { status } = useSession()

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
                                    fontSize: '1rem !important',
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
                            Welcome to {themeConfig.templateName}! 👋🏻
                        </Typography>
                        {!(status === 'authenticated') && (
                            <Typography variant='body2'>
                                Please sign-in to your account and start the adventure
                            </Typography>
                        )}
                    </Box>
                    <LoginForm />
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Typography variant='body2' sx={{ marginRight: 2 }}>
                            New on our platform?
                        </Typography>
                        <Typography variant='body2'>
                            <Link passHref href='/auth/register'>
                                <LinkStyled>Create an account</LinkStyled>
                            </Link>
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 5 }}>or</Divider>
                    <OAuthSignIn providers={providers} />
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
        props: { providers },
    }
}

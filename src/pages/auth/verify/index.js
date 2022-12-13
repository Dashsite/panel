import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Alert, Box, Button, Typography, CardContent, Card as MuiCard, Collapse } from '@mui/material'

import { styled } from '@mui/material/styles'

import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { FooterIllustration, LogoHeader } from 'src/views/auth'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const Card = styled(MuiCard)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: '28rem' },
}))

const VerifyEmailPage = () => {
    const router = useRouter()
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/auth/login')
        },
    })
    const { token } = router.query
    const [error, setError] = useState('')
    const [verificationLoading, setVerificationLoading] = useState(true)

    useEffect(() => {
        if (token) {
            fetch('/api/auth/verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            }).then(res => {
                if (res.status === 200) {
                    setVerificationLoading(false)
                } else {
                    setError('Invalid or expired token')
                    setVerificationLoading(false)
                }
            })
        }
    }, [token])

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

                            <Collapse in={!verificationLoading && !error}>
                                <Alert severity='success' sx={{ mt: 8 }}>
                                    Email is verified! 🎉
                                </Alert>
                            </Collapse>
                            <Collapse in={!verificationLoading && error}>
                                <Alert severity='error' sx={{ mt: 8 }}>
                                    {error}
                                </Alert>
                            </Collapse>
                            <Collapse in={verificationLoading}>
                                <Alert severity='info' sx={{ mt: 8 }}>
                                    Verifying email...
                                </Alert>
                            </Collapse>
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
                                href='/'
                            >
                                Go to Dashboard
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                <FooterIllustration />
            </Box>
        )
    } else {
        return <></>
    }
}
VerifyEmailPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default VerifyEmailPage

import { useState } from 'react'
import {
    Box,
    Collapse,
    Alert,
    AlertTitle,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import router from 'next/router'

const LinkStyled = styled('a')(({ theme }) => ({
    fontSize: '0.875rem',
    textDecoration: 'none',
    color: theme.palette.primary.main,
}))

/**
 * Component that renders the login form and handles the login process.
 */
const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showError, setShowError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        setIsLoading(true)
        setShowError(false)

        const result = await signIn('credentials', {
            email,
            password,
            callbackUrl: `${window.location.origin}/`,
            redirect: false,
        })

        if (result.status === 200) {
            router.push('/')
        }

        if (result.error) setShowError(true)
        setIsLoading(false)
    }

    return (
        <>
            <Collapse in={showError} timeout='auto'>
                <Alert severity='error' sx={{ marginBottom: 8 }}>
                    <AlertTitle>Error</AlertTitle>
                    {/* Login Error wrong */}
                    Email or password is incorrect. Please check your credentials and try again.
                </Alert>
            </Collapse>

            <form
                onSubmit={e => {
                    e.preventDefault()
                    handleLogin()
                }}
            >
                <TextField
                    autoFocus
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
                    sx={{
                        mb: 3,
                        mt: 3,
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'right',
                    }}
                >
                    <Link passHref href='/auth/reset'>
                        <LinkStyled>Forgot Password?</LinkStyled>
                    </Link>
                </Box>
                {/* // make button default enter key */}
                <LoadingButton
                    fullWidth
                    size='large'
                    loading={isLoading}
                    variant='contained'
                    sx={{ marginBottom: 7 }}
                    disabled={!(email && password)}
                    type='submit'
                >
                    Login
                </LoadingButton>
            </form>
        </>
    )
}

export default LoginForm

import PropTypes from 'prop-types'
import { useState } from 'react'
import Link from 'next/link'

import {
    Alert,
    AlertTitle,
    Checkbox,
    Collapse,
    TextField,
    List,
    ListItem,
    InputLabel,
    IconButton,
    FormControl,
    OutlinedInput,
    InputAdornment,
    FormControlLabel as MuiFormControlLabel,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { signIn } from 'next-auth/react'

import LoadingButton from '@mui/lab/LoadingButton'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import FormNotification from 'src/components/FormNotification'

const LinkStyled = styled(Link)(({ theme }) => ({
    fontSize: '0.875rem',
    textDecoration: 'none',
    color: theme.palette.primary.main,
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(4),
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary,
    },
}))

/**
 * Component that renders the Register form and handles the registration process.
 */
const RegisterForm = ({ successHandler }) => {
    const [error, setError] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async () => {
        setError([])
        if (!name || !email || !password || !isPrivacyChecked) return
        if (password !== passwordConfirm) {
            setError([{ password: 'Passwords do not match' }])

            return
        }
        setIsLoading(true)

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
        setIsLoading(false)
        if (response.status === 200) {
            await signIn('credentials', {
                email,
                password,
                callbackUrl: `${window.location.origin}/`,
                redirect: false,
            })
            successHandler(true)

            return
        }

        const jsonResponse = await response.json()
        if (response.status === 400) setError(jsonResponse.error)
        if (response.status === 409) setError([{ email: 'Email already exists' }])
    }

    return (
        <>
            <FormNotification errors={error} />
            <form
                onSubmit={event => {
                    event.preventDefault()
                    handleRegister()
                }}
            >
                <TextField
                    autoFocus
                    fullWidth
                    id='name'
                    label='Username'
                    value={name}
                    sx={{ marginBottom: 4 }}
                    onChange={event => setName(event.target.value)}
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
                                    aria-label='toggle password visibility'
                                >
                                    {showPassword ? (
                                        <EyeOutline fontSize='small' />
                                    ) : (
                                        <EyeOffOutline fontSize='small' />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor='auth-register-confirm-password'>Confirm Password</InputLabel>
                    <OutlinedInput
                        label='ConfirmPassword'
                        value={passwordConfirm}
                        id='auth-register-confirm-password'
                        onChange={event => setPasswordConfirm(event.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    edge='end'
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label='toggle password visibility'
                                >
                                    {showPassword ? (
                                        <EyeOutline fontSize='small' />
                                    ) : (
                                        <EyeOffOutline fontSize='small' />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox checked={isPrivacyChecked} onChange={() => setIsPrivacyChecked(!isPrivacyChecked)} />
                    }
                    label={
                        <>
                            <span>I agree to </span>
                            <LinkStyled href='/' passHref onClick={e => e.preventDefault()}>
                                Privacy policy & Terms
                            </LinkStyled>
                        </>
                    }
                />
                <LoadingButton
                    type='submit'
                    loading={isLoading}
                    fullWidth
                    size='large'
                    variant='contained'
                    disabled={!(isPrivacyChecked && name && email && password && passwordConfirm)}
                    sx={{ marginBottom: 7 }}
                >
                    Sign up
                </LoadingButton>
            </form>
        </>
    )
}

RegisterForm.propTypes = {
    successHandler: PropTypes.func.isRequired,
}

export default RegisterForm

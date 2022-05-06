import { useState } from 'react'
import {
  Box,
  Collapse,
  Alert,
  AlertTitle,
  List,
  ListItem,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const ResetForm = ({ passwordReset, successHandler }) => {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = async () => {
    setIsLoading(true)
    let result

    if (password !== passwordConfirm) {
      setError('Passwords do not match')
      setIsLoading(false)

      return
    }
    if (passwordReset) {
      result = await fetch('/api/auth/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password
        })
      })
    } else {
      result = await fetch('/api/auth/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      })
    }

    if (result.status === 500) {
      setError('Something went wrong. Please try again!')
    }

    if (result.status === 200) {
      successHandler(true)
    }

    setIsLoading(false)
  }

  return (
    <>
      <Collapse in={error.length > 0} timeout='auto'>
        <Alert severity='error' sx={{ marginBottom: 4 }}>
          <AlertTitle>Error</AlertTitle>
          {password ? (
            <List>
              {error.split('. ').map((string, index) => (
                <ListItem dense disableGutters key={index}>
                  • {string}.
                </ListItem>
              ))}
            </List>
          ) : (
            error
          )}
        </Alert>
      </Collapse>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleReset()
        }}
      >
        {passwordReset ? (
          <>
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
                      {showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
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
                      {showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <LoadingButton
              fullWidth
              size='large'
              loading={isLoading}
              variant='contained'
              sx={{ mb: 7, mt: 3 }}
              disabled={!(password && passwordConfirm)}
              type='submit'
            >
              Reset Password
            </LoadingButton>
          </>
        ) : (
          <>
            <TextField
              autoFocus
              fullWidth
              type='email'
              label='Email'
              value={email}
              sx={{ marginBottom: 4 }}
              onChange={event => setEmail(event.target.value)}
            />
            <LoadingButton
              fullWidth
              size='large'
              loading={isLoading}
              variant='contained'
              sx={{ mb: 7, mt: 3 }}
              disabled={!email}
              type='submit'
            >
              Reset Password
            </LoadingButton>
          </>
        )}
      </form>
    </>
  )
}

export default ResetForm

import { useState } from 'react'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { Field, Form } from 'react-final-form'
import FormNotifications from 'src/components/FormNotification'

const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(4),
        width: '100%',
        textAlign: 'center',
    },
}))

const TabSecurity = () => {
    const [showValues, setValues] = useState({
        showNewPassword: false,
        showCurrentPassword: false,
        showConfirmNewPassword: false,
    })
    const [openAlert, setOpenAlert] = useState(false)

    const handleClickShowCurrentPassword = () => {
        setValues({ ...showValues, showCurrentPassword: !showValues.showCurrentPassword })
    }

    const handleClickShowNewPassword = () => {
        setValues({ ...showValues, showNewPassword: !showValues.showNewPassword })
    }

    const handleClickShowConfirmNewPassword = () => {
        setValues({ ...showValues, showConfirmNewPassword: !showValues.showConfirmNewPassword })
    }

    const onSubmit = async values => {
        setOpenAlert(false)
        const { currentPassword, newPassword, confirmNewPassword } = values

        if (newPassword !== confirmNewPassword) {
            return [{ confirmNewPassword: 'Passwords do not match' }]
        }

        const res = await fetch('/api/account/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentPassword,
                password: newPassword,
            }),
        })
        const json = await res.json()

        if (res.status === 400) return json.error
        if (res.status === 500) return [{ message: 'Server Error' }]
        if (res.status === 200) {
            setOpenAlert(true)
            return
        }
    }

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, submitErrors, dirtySinceLastSubmit, dirty }) => (
                <>
                    <Box sx={{ padding: 6 }}>
                        <FormNotifications
                            errors={submitErrors}
                            showLoadinger={submitting}
                            successMessage='Your password has been updated successfully!'
                            showSuccess={openAlert && !dirtySinceLastSubmit}
                        />
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={7}>
                                <Grid item xs={12} sm={6}>
                                    <Grid container spacing={5}>
                                        <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                                            <Field name='currentPassword'>
                                                {({ input, meta }) => (
                                                    <FormControl fullWidth>
                                                        <InputLabel htmlFor='currentPassword'>
                                                            Current Password
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            label='Current Password'
                                                            type={showValues.showCurrentPassword ? 'text' : 'password'}
                                                            endAdornment={
                                                                <InputAdornment position='end'>
                                                                    <IconButton
                                                                        edge='end'
                                                                        aria-label='toggle password visibility'
                                                                        onClick={handleClickShowCurrentPassword}
                                                                    >
                                                                        {showValues.showCurrentPassword ? (
                                                                            <EyeOutline />
                                                                        ) : (
                                                                            <EyeOffOutline />
                                                                        )}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            {...input}
                                                        />
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Grid>

                                        <Grid item xs={12} sx={{ marginTop: 6 }}>
                                            <Field name='newPassword'>
                                                {({ input, meta }) => (
                                                    <FormControl fullWidth>
                                                        <InputLabel htmlFor='newPassword'>New Password</InputLabel>
                                                        <OutlinedInput
                                                            required
                                                            label='New Password'
                                                            type={showValues.showNewPassword ? 'text' : 'password'}
                                                            endAdornment={
                                                                <InputAdornment position='end'>
                                                                    <IconButton
                                                                        edge='end'
                                                                        onClick={handleClickShowNewPassword}
                                                                        aria-label='toggle password visibility'
                                                                    >
                                                                        {showValues.showNewPassword ? (
                                                                            <EyeOutline />
                                                                        ) : (
                                                                            <EyeOffOutline />
                                                                        )}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            {...input}
                                                        />
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Field name='confirmNewPassword'>
                                                {({ input, meta }) => (
                                                    <FormControl fullWidth>
                                                        <InputLabel htmlFor='confirmNewPassword'>
                                                            Confirm New Password
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            required
                                                            label='Confirm New Password'
                                                            id='confirmNewPassword'
                                                            type={
                                                                showValues.showConfirmNewPassword ? 'text' : 'password'
                                                            }
                                                            endAdornment={
                                                                <InputAdornment position='end'>
                                                                    <IconButton
                                                                        edge='end'
                                                                        aria-label='toggle password visibility'
                                                                        onClick={handleClickShowConfirmNewPassword}
                                                                    >
                                                                        {showValues.showConfirmNewPassword ? (
                                                                            <EyeOutline />
                                                                        ) : (
                                                                            <EyeOffOutline />
                                                                        )}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            {...input}
                                                        />
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    sm={6}
                                    xs={12}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'end',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img alt='avatar' height={250} src='/images/pages/pose-m-1.png' />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>
                                        <ButtonStyled
                                            variant='contained'
                                            type='submit'
                                            disabled={submitting || !dirty}
                                            sx={{ marginRight: 3.5 }}
                                        >
                                            Save Changes
                                        </ButtonStyled>
                                        <ButtonStyled
                                            type='reset'
                                            variant='outlined'
                                            color='secondary'
                                            onClick={() => {}}
                                        >
                                            Reset
                                        </ButtonStyled>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </>
            )}
        />
    )
}

export default TabSecurity

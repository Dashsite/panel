import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import {
    TextField,
    Box,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    Button,
    Card,
    CardHeader,
    CardContent,
    InputAdornment,
    IconButton,
    OutlinedInput,
} from '@mui/material'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { Form, Field } from 'react-final-form'
import { updateUser, createUser } from 'src/redux/actions/users'
import FormNotification from 'src/components/FormNotification'

const UserForm = ({ user, cancelAction }) => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const roles = ['user', 'admin'] // TODO SYSTEM ROLES

    const onSubmit = async values => {
        let submitResult = null
        if (user) {
            submitResult = await dispatch(updateUser(user.id, values))
        } else {
            submitResult = await dispatch(createUser(values))
        }

        if (submitResult.action.type.endsWith('_SUCCESS')) {
            signIn('verify', { email: values.email, redirect: false })
            cancelAction()
        }
        if (submitResult.action.type.endsWith('_ERROR')) {
            return submitResult.error.response.data.error
        }
    }

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={user}
            render={({ handleSubmit, submitting, submitErrors }) => (
                // show Notification right next to the form (not in the form) both take the same space about 50%
                <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
                    <Box sx={{ flex: 1 }}>
                        <form onSubmit={handleSubmit}>
                            <Card sx={{ padding: 2 }}>
                                <CardHeader
                                    title={user ? 'Edit User' : 'Create User'}
                                    titleTypographyProps={{ variant: 'h6' }}
                                />
                                <CardContent>
                                    <Field name='name'>
                                        {({ input, meta }) => (
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    label='Username'
                                                    sx={{ marginBottom: 4 }}
                                                    required
                                                    {...input}
                                                />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </Box>
                                        )}
                                    </Field>
                                    <Field name='email'>
                                        {({ input, meta }) => (
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    label='E-Mail'
                                                    sx={{ marginBottom: 4 }}
                                                    required
                                                    {...input}
                                                />
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </Box>
                                        )}
                                    </Field>
                                    <Field name='role'>
                                        {({ input, meta }) => (
                                            <Box>
                                                <FormControl fullWidth sx={{ marginBottom: 4 }}>
                                                    <InputLabel id='role'>Role</InputLabel>
                                                    <Select label='Role' labelId='role' required {...input}>
                                                        {roles.map(role => (
                                                            <MenuItem key={role} value={role}>
                                                                {role}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </Box>
                                        )}
                                    </Field>
                                    {!user && (
                                        <Field name='password'>
                                            {({ input, meta }) => (
                                                <Box>
                                                    <FormControl fullWidth sx={{ marginBottom: 4 }} variant='outlined'>
                                                        <InputLabel htmlFor='password'>Password</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth
                                                            label='Password'
                                                            id='password'
                                                            required
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
                                                            {...input}
                                                        />

                                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                                    </FormControl>
                                                </Box>
                                            )}
                                        </Field>
                                    )}
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                            sx={{ marginRight: 4 }}
                                            type='submit'
                                            variant='contained'
                                            disabled={submitting}
                                        >
                                            Submit
                                        </Button>
                                        <Button type='button' color='grey' variant='contained' onClick={cancelAction}>
                                            Cancel
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </form>
                    </Box>
                    <FormNotification
                        errors={submitErrors}
                        showLoadinger={submitting}
                        sx={{ flex: 1, marginLeft: 8 }}
                    />
                </Box>
            )}
        />
    )
}

export default UserForm

UserForm.prototype = {
    user: PropTypes.object,
    roles: PropTypes.array,
    submitAction: PropTypes.func,
}

import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
    Alert,
    AlertTitle,
    Checkbox,
    Collapse,
    TextField,
    List,
    Box,
    ListItem,
    InputLabel,
    IconButton,
    FormControl,
    OutlinedInput,
    InputAdornment,
    MenuItem,
    Select,
    FormControlLabel as MuiFormControlLabel,
} from '@mui/material'
import { Form, Field } from 'react-final-form'
import { updateUser, createUser } from 'src/redux/actions/users'
import FormErrors from 'src/components/vertical/FormErrors'
import Typography from 'src/@core/theme/typography'

const UserForm = ({ user, cancelAction }) => {
    const dispatch = useDispatch()
    const roles = ['user', 'admin'] // TODO SYSTEM ROLES

    const onSubmit = async values => {
        let submitResult = null
        if (user) {
            submitResult = await dispatch(updateUser(user.id, values))
        } else {
            submitResult = await dispatch(createUser(values))
        }

        if (submitResult.action.type.endsWith('_SUCCESS')) {
            // TODO redirect to overview
            console.log('success')
        }
        if (submitResult.action.type.endsWith('_ERROR')) {
            return submitResult.error.response.data.error
        }
    }

    return (
        <>
            <Form
                onSubmit={onSubmit}
                initialValues={user}
                render={({ handleSubmit, submitting, submitErrors }) => (
                    <>
                        <FormErrors formErrors={submitErrors} />
                        <form onSubmit={handleSubmit}>
                            <Field name='username'>
                                {({ input, meta }) => (
                                    <Box>
                                        <TextField autoFocus label='Username' sx={{ marginBottom: 4 }} {...input} />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </Box>
                                )}
                            </Field>
                            <Field name='email'>
                                {({ input, meta }) => (
                                    <Box>
                                        <TextField label='E-Mail' sx={{ marginBottom: 4 }} {...input} />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </Box>
                                )}
                            </Field>
                            <Field name='role'>
                                {({ input, meta }) => (
                                    <Box>
                                        <FormControl fullWidth sx={{ marginBottom: 4 }}>
                                            <InputLabel id='role'>Role</InputLabel>
                                            <Select label='Role' labelId='role' {...input}>
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
                            <Field name='password'>
                                {({ input, meta }) => (
                                    <Box>
                                        <TextField label='Password' sx={{ marginBottom: 4 }} {...input} />

                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </Box>
                                )}
                            </Field>
                            <Box className='buttons'>
                                <button type='submit' disabled={submitting}>
                                    Submit
                                </button>
                            </Box>
                            <Box className='buttons'>
                                <button type='button' onClick={cancelAction}>
                                    Cancel
                                </button>
                            </Box>
                        </form>
                    </>
                )}
            />
        </>
    )
}

export default UserForm

UserForm.prototype = {
    user: PropTypes.object,
    roles: PropTypes.array,
    submitAction: PropTypes.func,
}

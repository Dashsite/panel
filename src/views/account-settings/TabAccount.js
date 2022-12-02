// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import {
    Box,
    Grid,
    Link,
    Alert,
    Collapse,
    Select,
    MenuItem,
    TextField,
    Typography,
    InputLabel,
    AlertTitle,
    IconButton,
    CardContent,
    FormControl,
    Button,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Form, Field } from 'react-final-form'

import CloseIcon from '@mui/icons-material/Close'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import FormErrors from 'src/components/FormErrors'

const ImgStyled = styled('img')(({ theme }) => ({
    // set square image but keep aspect ratio
    width: 150,
    height: 150,
    objectFit: 'cover',
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius,
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center',
    },
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
        textAlign: 'center',
        marginTop: theme.spacing(4),
    },
}))

const TabAccount = () => {
    const dispatch = useDispatch()
    const { data: session } = useSession({ required: true })
    const [openAlert, setOpenAlert] = useState(false)
    const [values, setValues] = useState({
        username: '',
        email: '',
    })

    useEffect(() => {
        if (session) {
            setValues({
                username: session.user.username,
                email: session.user.email,
            })
        }
    }, [session])

    // handle file upload to api/account/avatar POST
    const handleFileUpload = async e => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        const res = await fetch('/api/account/avatar', { method: 'POST', body: formData })
        if (res.status === 201) {
            setOpenAlert(true)
        }
    }

    const resetValues = () => {
        setValues({
            username: session.user.username,
            email: session.user.email,
        })
    }

    const onSubmit = async submitValues => {
        const res = await fetch('/api/account', {
            method: 'PATCH',
            body: JSON.stringify(submitValues),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const json = await res.json()

        if (res.status === 400) return [json.error]
        if (res.status === 500) return [{ message: 'Server Error' }]
        if (res.status === 200) {
            setOpenAlert(true)
            return
        }
    }

    return (
        <>
            <Form onSubmit={onSubmit} initialValues={values}>
                {({ handleSubmit, submitting, submitErrors, dirtySinceLastSubmit }) => (
                    <Box sx={{ padding: 6 }}>
                        <FormErrors formErrors={submitErrors} />
                        <Collapse
                            mountOnEnter
                            in={openAlert && !dirtySinceLastSubmit}
                            timeout='auto'
                            sx={{ marginBottom: 3 }}
                        >
                            <Alert severity='success'>
                                <AlertTitle>Success</AlertTitle>
                                Your account has been updated successfully!
                            </Alert>
                        </Collapse>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={7}>
                                <Grid item xs={12} sx={{ marginBottom: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ImgStyled src={session?.user?.image} alt='Profile Pic' />
                                        <Box>
                                            <ButtonStyled
                                                component='label'
                                                variant='contained'
                                                htmlFor='account-settings-upload-image'
                                            >
                                                Upload New Photo
                                                <input
                                                    type='file'
                                                    id='account-settings-upload-image'
                                                    hidden
                                                    onChange={handleFileUpload}
                                                />
                                            </ButtonStyled>
                                            <ResetButtonStyled
                                                color='error'
                                                variant='outlined'
                                                onClick={() => setImgSrc('/images/avatars/1.png')}
                                            >
                                                Reset
                                            </ResetButtonStyled>
                                            <Typography variant='body2' sx={{ marginTop: 5 }}>
                                                Allowed PNG or JPEG. Max size of 800K.
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field name='username'>
                                        {({ input, meta }) => (
                                            <TextField fullWidth type='text' label='Username' {...input} />
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field name='email'>
                                        {({ input, meta }) => (
                                            <TextField fullWidth type='text' label='E-Mail' {...input} />
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant='contained'
                                        sx={{ marginRight: 3.5 }}
                                        type='submit'
                                        disabled={submitting}
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        type='reset'
                                        variant='outlined'
                                        color='secondary'
                                        onClick={() => resetValues()}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                )}
            </Form>
        </>
    )
}

export default TabAccount

import { useState } from 'react'

import { Box, Grid, TextField, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Form, Field } from 'react-final-form'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import FormNotifications from 'src/components/FormNotification'

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
        marginTop: theme.spacing(4),
        width: '100%',
        textAlign: 'center',
    },
}))

const StyledImageBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        display: 'flex',
        alignItems: 'flex-end',
    },
}))

const TabAccount = () => {
    const { data: session } = useSession({ required: true })
    const [openAlert, setOpenAlert] = useState(false)
    const [imageSrc, setImageSrc] = useState(null)
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

    const resetValues = form => {
        setValues({
            username: session.user.username,
            email: session.user.email,
        })
        setImageSrc(null)
        form.reset()
        setOpenAlert(false)
    }

    const onSubmit = async submitValues => {
        setOpenAlert(false)
        let errors = []
        if (submitValues.image) {
            // Handle image upload
            const file = submitValues.image[0]
            const formData = new FormData()
            formData.append('image', file)
            const res = await fetch('/api/account/avatar', { method: 'POST', body: formData })
            if (res.status !== 201) errors.push({ Image: 'Image upload failed' })
        }

        // Handle other fields
        const res = await fetch('/api/account', {
            method: 'PATCH',
            // send all fields execot image
            body: JSON.stringify({ ...submitValues, image: undefined }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const json = await res.json()

        if (res.status === 400) return [...json.error, ...errors]
        if (res.status === 500) return [{ message: 'Server Error' }, ...errors]
        if (res.status === 200) {
            setOpenAlert(true)
            return
        }
    }

    return (
        <>
            <Form onSubmit={onSubmit} initialValues={values}>
                {({ handleSubmit, submitting, submitErrors, dirtySinceLastSubmit, dirty, form, pristine }) => (
                    <Box sx={{ padding: 6 }}>
                        <FormNotifications
                            errors={submitErrors}
                            successMessage=' Your account has been updated successfully!'
                            showSuccess={openAlert && !dirtySinceLastSubmit}
                            showLoadinger={submitting}
                        />
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={7}>
                                <Grid item xs={12} sx={{ marginBottom: 3 }}>
                                    <Box>
                                        <Field name='image'>
                                            {({ input: { value, onChange, ...input }, meta }) => (
                                                <StyledImageBox>
                                                    <ImgStyled
                                                        src={imageSrc || session?.user?.image}
                                                        alt='Profile Pic'
                                                    />
                                                    <ButtonStyled component='label' variant='contained' htmlFor='image'>
                                                        Select New Avatar
                                                        <input
                                                            type='file'
                                                            id='image'
                                                            hidden
                                                            name='image'
                                                            accept='image/png, image/jpeg'
                                                            onChange={({ target }) => {
                                                                let reader = new FileReader()
                                                                reader.readAsDataURL(target.files[0])
                                                                reader.onload = () => {
                                                                    setImageSrc(reader.result)
                                                                }
                                                                onChange(target.files)
                                                            }}
                                                            {...input}
                                                        />
                                                    </ButtonStyled>
                                                </StyledImageBox>
                                            )}
                                        </Field>

                                        <Typography variant='body2' sx={{ marginTop: 5 }}>
                                            Allowed PNG or JPEG. Max size of 8MB.
                                        </Typography>
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
                                    <ButtonStyled
                                        variant='contained'
                                        sx={{ marginRight: 3.5 }}
                                        type='submit'
                                        disabled={submitting || !dirty}
                                    >
                                        Save Changes
                                    </ButtonStyled>
                                    <ButtonStyled
                                        type='reset'
                                        variant='outlined'
                                        color='secondary'
                                        onClick={() => resetValues(form)}
                                    >
                                        Reset
                                    </ButtonStyled>
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

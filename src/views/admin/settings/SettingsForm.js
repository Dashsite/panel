import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Button, Tooltip, Grid } from '@mui/material'
import { Form, Field } from 'react-final-form'
import SettingsEdit from './SettingsEdit'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import { styled } from '@mui/system'
import FormNotifications from 'src/components/FormNotification'

const GridItem = styled(Grid)(({ theme }) => ({
    // if classname = 'center'
    '&.center': {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    // if classname = 'left'
    '&.right': {
        justifyContent: 'flex-end',
    },
}))

const SettingsForm = ({ options, category }) => {
    const [openAlert, setOpenAlert] = useState(false)

    if (!options) return null
    // convert options to an array of {optionName, value} -> do not include label, descpription, type
    const formOptions = Object.entries(options).reduce((acc, [key, { value }]) => {
        acc[key] = value
        return acc
    }, {})

    const onSubmit = async values => {
        setOpenAlert(false)
        // send request to server
        const res = await fetch('/api/admin/settings', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        if (!res.ok) {
            const json = await res.json()

            return json.error
        }
        setOpenAlert(true)
    }

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{ ...formOptions, provider: category }}
            render={({ handleSubmit, submitting, submitErrors, dirtySinceLastSubmit }) => (
                <>
                    <FormNotifications
                        errors={submitErrors}
                        showLoadinger={submitting}
                        showSuccess={openAlert && !dirtySinceLastSubmit}
                        successMessage='Settings saved'
                        sx={{ flex: 1, marginLeft: 8 }}
                    />
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginLeft: '5rem' }}>
                            <Grid container spacing={2} columns={12} width='100%'>
                                {Object.entries(options).map(([optionName, field]) => (
                                    <Field name={optionName} key={optionName}>
                                        {({ input, meta }) => (
                                            <>
                                                <GridItem item xs={4} className='center'>
                                                    <Typography>{field.label}</Typography>
                                                </GridItem>
                                                <GridItem item xs={1} className='center right'>
                                                    {field.description && (
                                                        <Tooltip title={field.description}>
                                                            <InformationOutline />
                                                        </Tooltip>
                                                    )}
                                                </GridItem>
                                                <GridItem item xs={7}>
                                                    <SettingsEdit field={field} {...input} />
                                                </GridItem>
                                            </>
                                        )}
                                    </Field>
                                ))}
                            </Grid>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }} mt={8}>
                                <Button type='submit' variant='contained' disabled={submitting}>
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </>
            )}
        />
    )
}

export default SettingsForm

SettingsForm.propTypes = {
    options: PropTypes.object,
}

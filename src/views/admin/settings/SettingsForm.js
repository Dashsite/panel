import PropTypes from 'prop-types'
import { Box, Typography, Button, Tooltip, Grid } from '@mui/material'
import { Form, Field } from 'react-final-form'
import SettingsEdit from './SettingsEdit'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import { styled } from '@mui/system'

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

const SettingsForm = ({ options }) => {
    return (
        <Form
            onSubmit={() => {}}
            initialValues={options}
            render={({ handleSubmit, submitting, submitErrors }) => (
                <form onSubmit={handleSubmit}>
                    <Box sx={{ marginLeft: '5rem' }}>
                        <Grid container spacing={2} columns={12} width='100%'>
                            {Object.entries(options).map(([key, value]) => (
                                <Field name='key'>
                                    {({ input, meta }) => (
                                        <>
                                            <GridItem item xs={4} className='center'>
                                                <Typography>{value.label}</Typography>
                                            </GridItem>
                                            <GridItem item xs={1} className='center right'>
                                                {value.description && (
                                                    <Tooltip title={value.description}>
                                                        <InformationOutline />
                                                    </Tooltip>
                                                )}
                                            </GridItem>
                                            <GridItem item xs={7}>
                                                <SettingsEdit field={value} {...input} />
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
                        {submitErrors && (
                            <Box sx={{ marginTop: 12 }}>
                                <Typography color='error'>{submitErrors}</Typography>
                            </Box>
                        )}
                    </Box>
                </form>
            )}
        />
    )
}

export default SettingsForm

SettingsForm.propTypes = {
    options: PropTypes.object,
}

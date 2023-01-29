import PropTypes from 'prop-types'
import { Box, Typography, Button } from '@mui/material'
import { Form, Field } from 'react-final-form'
import SettingsEdit from './SettingsEdit'

const SettingsForm = ({ options }) => {
    return (
        <Form
            onSubmit={() => {}}
            initialValues={options}
            render={({ handleSubmit, submitting, submitErrors }) => (
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {Object.entries(options).map(([key, value]) => (
                            <Box key={key} mb={6} mr={4}>
                                <SettingsEdit option={[key, value]} />
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Button type='submit' variant='contained' disabled={submitting}>
                            Save
                        </Button>
                    </Box>
                    {submitErrors && (
                        <Box sx={{ marginTop: 4 }}>
                            <Typography color='error'>{submitErrors}</Typography>
                        </Box>
                    )}
                </form>
            )}
        />
    )
}

export default SettingsForm

SettingsForm.propTypes = {
    options: PropTypes.object,
}

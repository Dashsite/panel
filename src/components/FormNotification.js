import { PropTypes } from 'prop-types'
import { Alert, AlertTitle, Collapse, List, ListItem, Box, CircularProgress, LinearProgress } from '@mui/material'

const FormNotifications = ({
    errors = [],
    successTitle = 'Success',
    successMessage,
    showLoadinger = false,
    showErrors = true,
    showSuccess = false,
    sx,
}) => {
    return (
        <Box sx={{ marginBottom: 4, ...sx }}>
            <Collapse in={showErrors && (errors.length > 0 || typeof errors === 'string')} timeout='auto'>
                <Alert severity='error'>
                    <AlertTitle>Error</AlertTitle>
                    <List>
                        {
                            // If there is only one error, it will be a string
                            // If there are multiple errors, it will be an array of objects
                            // So we need to check if it is an array or not

                            Array.isArray(errors) ? (
                                errors?.map((error, index) => (
                                    <ListItem dense disableGutters key={index}>
                                        • {Object.values(error)}
                                    </ListItem>
                                ))
                            ) : (
                                <ListItem dense disableGutters>
                                    • {errors}
                                </ListItem>
                            )
                        }
                    </List>
                </Alert>
            </Collapse>
            <Collapse mountOnEnter in={showSuccess} timeout='auto'>
                <Alert severity='success'>
                    <AlertTitle>{successTitle}</AlertTitle>
                    {successMessage}
                </Alert>
            </Collapse>
            {showLoadinger && <LinearProgress />}
        </Box>
    )
}

export default FormNotifications

FormNotifications.propTypes = {
    errors: PropTypes.array,
    successTitle: PropTypes.string,
    successMessage: PropTypes.string,
    showLoadinger: PropTypes.bool,
    showErrors: PropTypes.bool,
    showSuccess: PropTypes.bool,
    sx: PropTypes.object,
}

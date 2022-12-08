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
            <Collapse in={showErrors && errors?.length > 0} timeout='auto'>
                <Alert severity='error'>
                    <AlertTitle>Error</AlertTitle>
                    <List>
                        {errors?.map((error, index) => (
                            <ListItem dense disableGutters key={index}>
                                • {Object.values(error)}
                            </ListItem>
                        ))}
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

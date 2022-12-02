import { Alert, AlertTitle, Collapse, List, ListItem } from '@mui/material'

const FormErrors = ({ formErrors = [] }) => {
    return (
        <Collapse in={formErrors?.length > 0} timeout='auto'>
            <Alert severity='error' sx={{ marginBottom: 4 }}>
                <AlertTitle>Error</AlertTitle>
                <List>
                    {formErrors?.map((error, index) => (
                        <ListItem dense disableGutters key={index}>
                            • {Object.values(error)}.
                        </ListItem>
                    ))}
                </List>
            </Alert>
        </Collapse>
    )
}

export default FormErrors

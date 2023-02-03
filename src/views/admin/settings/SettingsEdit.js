import { useState } from 'react'
import { Box, Switch, TextField } from '@mui/material'
import { NumberEdit } from 'src/components/Edits/NumberEdit'

const SettingsEdit = ({ field, value, ...props }) => {
    const renderEdit = () => {
        if (field.type === 'string') {
            return (
                <TextField
                    fullWidth
                    variant='outlined'
                    // do not show any label
                    label=''
                    placeholder='Enter value'
                    value={value}
                    {...props}
                />
            )
        }

        if (field.type === 'boolean') {
            // manually call onChange to bypass the Switch's onChange
            return <Switch checked={value} onChange={() => props.onChange({ target: { value: !value } })} />
        }

        if (field.type === 'number') {
            return (
                <NumberEdit
                    value={value}
                    placeholder='Enter value'
                    formatNumber={false}
                    onChange={props.onChange}
                    fullWidth={true}
                />
            )
        }
    }

    return <Box>{renderEdit()}</Box>
}

export default SettingsEdit

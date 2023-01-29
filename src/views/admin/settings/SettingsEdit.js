import { useState } from 'react'
import { Box, Switch, TextField } from '@mui/material'
import { NumberEdit } from 'src/components/Edits/NumberEdit'

const SettingsEdit = ({ field, ...props }) => {
    const renderEdit = f => {
        console.log(f)
        if (f.type === 'text') {
            return (
                <TextField
                    fullWidth
                    variant='outlined'
                    // do not show any label
                    label=''
                    placeholder='Enter value'
                    {...props}
                />
            )
        }

        if (f.type === 'boolean') {
            return <Switch {...props} />
        }

        if (f.type === 'number') {
            return <NumberEdit fullWidth formatNumber={false} {...props} />
        }
    }

    return <Box>{renderEdit(field)}</Box>
}

export default SettingsEdit

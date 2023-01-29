import { useState } from 'react'
import { Box, Switch, TextField } from '@mui/material'
import { NumberEdit } from 'src/components/Edits/NumberEdit'

const SettingsEdit = ({ option }) => {
    const [key, optionValue] = option

    const [value, setValue] = useState(optionValue)

    if (typeof option === 'undefined') {
        return null
    }

    if (typeof value === 'string') {
        return (
            <Box>
                <TextField
                    value={value}
                    label={key}
                    onChange={e => {
                        setValue(e.target.value)
                    }}
                />
            </Box>
        )
    }

    if (typeof value === 'boolean') {
        return (
            <Box>
                <Switch
                    checked={value}
                    label={key}
                    onChange={e => {
                        setValue(e.target.checked)
                    }}
                />
            </Box>
        )
    }

    if (typeof value === 'number') {
        return (
            <NumberEdit
                value={Number(value)}
                label={key}
                onChange={e => {
                    setValue(e.target.value)
                }}
            />
        )
    }
}

export default SettingsEdit

import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState, useEffect } from 'react'
import SidebarList from 'src/components/Lists/SidebarList'
import SettingsForm from 'src/views/admin/settings/SettingsForm'

const SettingsOverview = ({}) => {
    const [config, setConfig] = useState({})
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        const getConfig = async () => {
            const response = await fetch('/api/admin/settings')
            const config = await response.json()
            setConfig(config)
            setSelectedCategory(Object.keys(config)[0])
        }
        getConfig()
    }, [])

    return (
        <Box>
            <Typography>Settings</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '1rem' }}>
                <Box sx={{ flexShrink: 0, width: '15rem' }}>
                    <SidebarList
                        options={Object.keys(config)}
                        selectedOption={selectedCategory}
                        selectOption={setSelectedCategory}
                    />
                </Box>
                <Box p={2} ml={2} sx={{ flexGrow: 1 }}>
                    <SettingsForm options={config[selectedCategory]} category={selectedCategory} />
                </Box>
            </Box>
        </Box>
    )
}

SettingsOverview.adminProtected = true
export default SettingsOverview

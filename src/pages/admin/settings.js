import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useEffect } from 'react'
import Config from 'src/lib/utils/Config'
import SidebarList from 'src/components/Lists/SidebarList'
import SettingsForm from 'src/views/admin/settings/SettingsForm'
import themeConfig from 'src/configs/themeConfig'

const SettingsOverview = ({ config }) => {
    const categories = Object.keys(config)
    const [selectedCategory, setSelectedCategory] = useState(categories[0])

    return (
        <Box>
            <Typography>Settings</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '1rem' }}>
                <Box sx={{ flexShrink: 0, width: '15rem' }}>
                    <SidebarList
                        options={categories}
                        selectedOption={selectedCategory}
                        selectOption={setSelectedCategory}
                    />
                </Box>
                <Box p={2} ml={2} sx={{ flexGrow: 1 }}>
                    <SettingsForm options={config[selectedCategory]} />
                </Box>
            </Box>
        </Box>
    )
}

export async function getServerSideProps() {
    // TODO USE API

    let config = {}
    // get all configs from Config -> iterator over all namespaces
    for await (const provider of Object.keys(Config)) {
        config[provider] = {}
        // get all configs from the namepsace -> iterator over all entries
        for await (const [key, value] of Config[provider].iterator()) {
            config[provider][key] = value
        }
    }

    // sort the providers alphabetically
    config = Object.fromEntries(Object.entries(config).sort(([a], [b]) => a.localeCompare(b)))

    return {
        props: {
            config,
        },
    }
}

SettingsOverview.adminProtected = true
export default SettingsOverview

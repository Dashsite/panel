import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useEffect } from 'react'
import Config from 'src/lib/utils/Config'
import CategoryList from 'src/views/admin/settings/CategoryList'

const SettingsOverview = ({ config }) => {
    const [selectedCategory, setSelectedCategory] = useState('system')

    const categories = Object.keys(config)

    return (
        <Box>
            <Typography>Settings</Typography>
            <Box>
                <CategoryList
                    categories={categories}
                    selectedCategory={selectedCategory}
                    selectCategory={setSelectedCategory}
                />
            </Box>
        </Box>
    )
}

export async function getServerSideProps() {
    let config = {}
    // get all configs from Config -> iterator over all namespaces
    for await (const provider of Object.keys(Config)) {
        config[provider] = {}
        // get all configs from the namepsace -> iterator over all entries
        for await (const [key, value] of Config[provider].iterator()) {
            config[provider][key] = value
        }
    }

    return {
        props: {
            config,
        },
    }
}

SettingsOverview.adminProtected = true
export default SettingsOverview

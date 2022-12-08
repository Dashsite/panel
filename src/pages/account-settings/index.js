// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        minWidth: 100,
    },
    [theme.breakpoints.down('sm')]: {
        minWidth: 67,
    },
}))

const TabName = styled('span')(({ theme }) => ({
    lineHeight: 1.71,
    fontSize: '0.875rem',
    marginLeft: theme.spacing(2.4),
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}))

const AccountSettings = () => {
    // ** State
    const [tab, setTab] = useState('account')

    const handleChange = (event, newValue) => {
        setTab(newValue)
    }

    return (
        <Card>
            <TabContext value={tab}>
                <TabList
                    onChange={handleChange}
                    aria-label='account-settings tabs'
                    sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
                >
                    <Tab
                        value='account'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountOutline />
                                <TabName>Account</TabName>
                            </Box>
                        }
                    />
                    <Tab
                        value='security'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LockOpenOutline />
                                <TabName>Security</TabName>
                            </Box>
                        }
                    />
                </TabList>

                <Box sx={{ display: tab === 'account' ? 'block' : 'none' }}>
                    <TabAccount />
                </Box>
                <Box sx={{ display: tab === 'security' ? 'block' : 'none' }}>
                    <TabSecurity />
                </Box>
                <Box sx={{ display: tab === 'info' ? 'block' : 'none' }}>
                    <TabInfo />
                </Box>
            </TabContext>
        </Card>
    )
}

export default AccountSettings

// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import { useSession, signOut } from 'next-auth/react'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}))

const UserDropdown = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState(null)

    const handleDropdownOpen = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = mode => {
        switch (mode) {
            case 'login':
                router.push('/auth/login')
                break
            case 'register':
                router.push('/auth/register')
                break
            case 'account':
                router.push('/account-settings')
                break
            case 'logout':
                signOut({ callbackUrl: `${window.location.origin}` })
                router.push('/')
                break
            default:
                break
        }
        setAnchorEl(null)
    }

    const styles = {
        py: 2,
        px: 4,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        textDecoration: 'none',
        '& svg': {
            fontSize: '1.375rem',
            color: 'text.secondary',
        },
    }

    if (status === 'authenticated') {
        return (
            <>
                <Badge
                    overlap='circular'
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={<BadgeContentSpan />}
                >
                    <Avatar
                        alt={session.user.name}
                        src={session.user.image}
                        onClick={handleDropdownOpen}
                        sx={{ cursor: 'pointer' }}
                        imgProps={{
                            referrerPolicy: 'no-referrer',
                        }}
                    />
                </Badge>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => handleDropdownClose()}
                    sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Box sx={{ pt: 2, pb: 3, px: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Badge
                                overlap='circular'
                                badgeContent={<BadgeContentSpan />}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            >
                                <Avatar
                                    alt={session.user.name}
                                    src={session.user.image}
                                    sx={{ width: '2.5rem', height: '2.5rem' }}
                                />
                            </Badge>
                            <Box
                                sx={{
                                    display: 'flex',
                                    marginLeft: 3,
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography sx={{ fontWeight: 600 }}>{session.user.name}</Typography>
                                <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                                    {session.user.role}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ mt: 0, mb: 1 }} />
                    <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('account')}>
                        <Box sx={styles}>
                            <AccountOutline sx={{ marginRight: 2 }} />
                            Account
                        </Box>
                    </MenuItem>

                    <Divider />
                    <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose('logout')}>
                        <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
                        Logout
                    </MenuItem>
                </Menu>
            </>
        )
    }
    return (
        <Fragment>
            <Badge
                overlap='circular'
                onClick={handleDropdownOpen}
                sx={{ ml: 2, cursor: 'pointer' }}
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Avatar
                    alt='John Doe'
                    onClick={handleDropdownOpen}
                    sx={{ width: 40, height: 40 }}
                    src='/images/avatars/1.png'
                />
            </Badge>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleDropdownClose()}
                sx={{ '& .MuiMenu-paper': { width: 150, marginTop: 4 } }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose('register')}>
                    <AccountPlusOutline sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
                    Register
                </MenuItem>
                <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose('login')}>
                    <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
                    Login
                </MenuItem>
            </Menu>
        </Fragment>
    )
}

export default UserDropdown

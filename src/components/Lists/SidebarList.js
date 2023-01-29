import PropTypes from 'prop-types'
import { Box, List, ListItem, ListItemText, ListItemButton, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'

const MenuNavLink = styled(ListItemButton)(({ theme }) => ({
    width: '100%',
    borderRadius: 100,
    color: theme.palette.text.primary,
    padding: theme.spacing(2.25, 3.5),
    transition: 'opacity .25s ease-in-out',
    textTransform: 'none',
    '&.active, &.active:hover': {
        boxShadow: theme.shadows[3],
        backgroundImage: `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 94%)`,
    },
    '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
        color: `${theme.palette.common.white} !important`,
    },
}))

const MenuItemText = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'opacity .25s ease-in-out',
    marginLeft: theme.spacing(4),
    ...(themeConfig.menuTextTruncate && { overflow: 'hidden' }),
}))

const ListBox = styled(List)(({ theme }) => ({
    backgroundColor: 'background.paper',
    maxWidth: 250,
    flexGrow: 1,
    overflow: 'auto',
    borderRadius: 10,
}))

const SidebarList = ({ options, selectedOption, selectOption }) => {
    // create a vertical list of categories as links like a side menu using MUI
    return (
        <ListBox>
            <List>
                {options.map(option => (
                    <MenuNavLink
                        component={Button}
                        className={selectedOption === option ? 'active' : ''}
                        onClick={() => selectOption(option)}
                    >
                        <MenuItemText>
                            <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>
                                {/* make first letter of each category uppercase */}
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </Typography>
                        </MenuItemText>
                    </MenuNavLink>
                ))}
            </List>
        </ListBox>
    )
}

export default SidebarList

SidebarList.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        })
    ).isRequired,
}

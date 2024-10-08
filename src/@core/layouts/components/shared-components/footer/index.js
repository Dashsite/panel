// ** MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'

// ** Footer Content Component
import FooterContent from './FooterContent'

const Footer = props => {
  // ** Props
  const { footerContent: userFooterContent } = props

  // ** Hook
  const contentWidth = useSelector(state => state.themeSettings.contentWidth)
  const theme = useTheme()

  return (
    <Box
      component='footer'
      className='layout-footer'
      sx={{
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        className='footer-content-container'
        sx={{
          width: '100%',
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          padding: theme.spacing(4, 6),
          ...(contentWidth === 'boxed' && { '@media (min-width:1440px)': { maxWidth: 1440 } })
        }}
      >
        {userFooterContent ? userFooterContent(props) : <FooterContent />}
      </Box>
    </Box>
  )
}

export default Footer

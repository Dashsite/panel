import router from 'next/router'
import Link from 'next/link'
import { Alert, Box, Button, Divider, Typography, CardContent, Card as MuiCard } from '@mui/material'
import { styled } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/auth/FooterIllustration'
import { OAuthSignIn, LoginForm, LogoHeader } from 'src/views/auth'

const Admin = ({}) => {
    return <div>This is an Admin Page</div>
}
Admin.adminProtected = true

export default Admin

import router from "next/router"
import Link from "next/link"
import { Alert, Box, Button, Divider, Typography, CardContent, Card as MuiCard } from "@mui/material"
import { styled } from "@mui/material/styles"
import themeConfig from "src/configs/themeConfig"
import BlankLayout from "src/@core/layouts/BlankLayout"
import FooterIllustrationsV1 from "src/views/auth/FooterIllustration"
import { getProviders, useSession } from "next-auth/react"
import { OAuthSignIn, LoginForm, LogoHeader } from "src/views/auth"

const LoginPage = ({}) => {
    return <div>This is an Admin Page</div>
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
AdminProductOverview.adminProtected = true

export default LoginPage

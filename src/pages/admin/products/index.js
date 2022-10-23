import router from 'next/router'
import Link from 'next/link'
import { Alert, Box, Button, Divider, Typography, CardContent, Card as MuiCard } from '@mui/material'
import { styled } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProxmoxProducts, getPterodactylProducts } from 'src/redux/actions/products'
import { useSelector } from 'react-redux'
import ProductOverviewTable from 'src/views/admin/products/ProductOverviewTable'

const AdminProductOverview = ({}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch the action to get the products
        dispatch(getPterodactylProducts())
        dispatch(getProxmoxProducts())
    }, [dispatch])

    return <ProductOverviewTable />
}

AdminProductOverview.adminProtected = true

export default AdminProductOverview

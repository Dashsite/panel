import { Alert, Box, Button, Divider, Typography, CardContent, Card as MuiCard } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProvidersWithProducts } from 'src/redux/actions/products'
import { useSelector } from 'react-redux'
import ProductOverviewTable from 'src/views/admin/products/ProductOverviewTable'

const AdminProductOverview = ({}) => {
    const dispatch = useDispatch()
    const providers = useSelector(state => state.products.providers)

    useEffect(() => {
        // dispatch the action to get the products
        dispatch(getProvidersWithProducts())
    }, [dispatch])

    return (
        <Box>
            <Typography variant='h4' gutterBottom>
                Products
            </Typography>
            {providers?.map(provider => {
                console.log(provider)
                return (
                    <Box mb={4}>
                        <Typography variant='h5' gutterBottom>
                            {provider.name}
                        </Typography>

                        <ProductOverviewTable
                            providers={providers}
                            products={provider.products}
                            categories={provider.product_categories}
                        />
                    </Box>
                )
            })}
        </Box>
    )
}

AdminProductOverview.adminProtected = true

export default AdminProductOverview

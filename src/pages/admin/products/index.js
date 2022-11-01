import { Alert, Box, Button, Divider, Typography, CardContent, Card as MuiCard } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProvidersWithProducts } from 'src/redux/actions/products'
import { useSelector } from 'react-redux'
import ProductOverviewTable from 'src/views/admin/products/ProductOverviewTable'
import { deleteProxmoxProduct, deletePterodactylProduct } from 'src/redux/actions/products'

const AdminProductOverview = ({}) => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    useEffect(() => {
        // dispatch the action to get the products
        dispatch(getProvidersWithProducts())
    }, [dispatch])

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant='h4' gutterBottom>
                Products
            </Typography>
            <Box>
                {products.providers?.map(provider => {
                    return (
                        <Box mb={8}>
                            <Typography variant='h5' gutterBottom>
                                {provider.name}
                            </Typography>

                            <ProductOverviewTable
                                providers={provider}
                                products={provider.products}
                                categories={provider.product_categories}
                                deleteAction={
                                    provider.name === 'Proxmox' ? deleteProxmoxProduct : deletePterodactylProduct
                                }
                            />
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

AdminProductOverview.adminProtected = true

export default AdminProductOverview

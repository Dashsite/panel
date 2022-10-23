// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import Chip from '@mui/material/Chip'
import { useSelector } from 'react-redux'

const ProductOverviewTable = ({}) => {
    const products = useSelector(state => state.products)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell width={150}>Price per hour</TableCell>
                        <TableCell align='right'>Category</TableCell>
                        <TableCell align='right'>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products?.pterodactyl?.map(product => (
                        <TableRow key={product.id} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
                            <TableCell component='th' scope='row'>
                                {product.name}
                            </TableCell>
                            <TableCell>{product.price_per_hour} €</TableCell>
                            <TableCell align='right'>
                                <Chip label={product.product_categories.name} variant='outlined' color='info' />
                            </TableCell>
                            <TableCell align='right'>Pterodactyl</TableCell>
                        </TableRow>
                    ))}

                    {products?.proxmox?.map(product => (
                        <TableRow key={product.id} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
                            <TableCell component='th' scope='row'>
                                {product.name}
                            </TableCell>
                            <TableCell>{product.price_per_hour} €</TableCell>
                            <TableCell align='right'>
                                <Chip label={product.product_categories.name} variant='outlined' color='info' />
                            </TableCell>
                            <TableCell align='right'>Proxmox</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductOverviewTable

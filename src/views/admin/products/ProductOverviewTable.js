import MaterialReactTable from 'material-react-table'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector } from 'react-redux'
import { Chip, IconButton } from '@mui/material'
import { Box } from 'mdi-material-ui'

const ProductOverviewTable = ({}) => {
    const products = useSelector(state => state.products)

    // pick a color for a category based on the category name for any name but always the same color for the same name
    const categoryColors = categoryName => {
        const colors = ['primary', 'red', 'blue', 'green', 'yellow', 'orange']
        const colorIndex = categoryName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
        return colors[colorIndex]
    }

    const columns = [
        {
            header: 'Name',
            accessorKey: 'name',
        },
        {
            header: 'Price per hour',
            accessorKey: 'price_per_hour',
        },
        {
            header: 'Category',
            accessorKey: 'product_categories.name',
            Cell: ({ cell }) => (
                <Chip
                    label={cell.getValue()}
                    color={categoryColors(cell.getValue())}
                    variant='outlined'
                    sx={{ padding: 0 }}
                />
            ),
        },
        {
            header: 'Type',
            // check if any product.key contains the row and if so, return the key name
            accessorFn: row => {
                const type = Object.keys(products).find(key => products[key].indexOf(row) !== -1)
                // capitalize the first letter
                return type.charAt(0).toUpperCase() + type.slice(1)
            },
        },
    ]

    const rows = [...products.proxmox, ...products.pterodactyl]

    // Combine all products into one array and add a type column based on the product type by checking the product key
    const rows2 = Object.keys(products).reduce((acc, key) => {
        return [...acc, ...products[key].map(product => ({ ...product, key }))]
    }, [])

    console.log(rows2())

    // set padding to row cells to 0
    return (
        <MaterialReactTable
            initialState={{ density: 'compact' }}
            title='Products'
            columns={columns}
            data={rows}
            muiTableBodyCellProps={{ padding: 'none' }}
            enableDensityToggle={false}
            muiTablePaginationProps={{ rowsPerPageOptions: [15, 25, 50, 100], rowsPerPage: 15 }}
            enableRowActions
            positionActionsColumn='last'
            renderRowActions={(row, index) => (
                <>
                    <IconButton onClick={() => console.info('Edit')}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => console.info('Delete')}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )}
        />
    )
}

export default ProductOverviewTable

import MaterialReactTable from 'material-react-table'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Chip, IconButton } from '@mui/material'

const ProductOverviewTable = ({ products, categories }) => {
    // pick a color for a category based on the category name for any name but always the same color for the same name
    const categoryColors = categoryName => {
        const colors = ['primary', 'red', 'blue', 'green', 'yellow', 'orange']
        const colorIndex = categoryName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
        return colors[colorIndex]
    }

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
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
            accessorFn: row => {
                const category = categories?.find(category => category.id === row.product_categories_id)
                return category ? category.name : 'No category'
            },
            Cell: ({ cell }) => (
                <Chip
                    label={cell.getValue()}
                    color={categoryColors(cell.getValue())}
                    variant='outlined'
                    sx={{ padding: 0 }}
                />
            ),
        },
    ]

    return (
        <MaterialReactTable
            initialState={{ density: 'compact' }}
            title='Products'
            columns={columns}
            data={products}
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
            muiTableFooterRowProps={{
                sx: {
                    borderRadius: 2,
                    border: '1px solid',
                },
            }}
        />
    )
}

export default ProductOverviewTable

import { useDispatch } from 'react-redux'
import MaterialReactTable from 'material-react-table'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Chip, IconButton, Typography } from '@mui/material'

const ProductOverviewTable = ({ provider, products, categories, deleteAction }) => {
    const dispatch = useDispatch()

    // pick a color for a category based on the category name for any name but always the same color for the same name
    const categoryColors = categoryName => {
        const colors = ['primary', 'red', 'blue', 'green', 'yellow', 'orange']
        const colorIndex = categoryName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
        return colors[colorIndex]
    }

    const deleteProduct = id => dispatch(deleteAction(id))

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
            renderRowActions={({ cell, row, table }) => (
                <>
                    <IconButton onClick={() => console.info('Edit')}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteProduct(row.original.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )}
            renderTopToolbarCustomActions={({ table }) => (
                <IconButton disableRipple onClick={() => console.info('Add')}>
                    <AddIcon />
                    <Typography variant='button'>Add</Typography>
                </IconButton>
            )}
            muiTablePaperProps={{
                sx: {
                    borderRadius: 2,
                    overflow: 'hidden',
                },
            }}
        />
    )
}

export default ProductOverviewTable

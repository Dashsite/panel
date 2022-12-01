import { useDispatch } from 'react-redux'
import MaterialReactTable from 'material-react-table'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Chip, IconButton, Typography, Tooltip } from '@mui/material'
import OverviewTable from 'src/components/OverviewTable'

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
        <OverviewTable
            title='Products'
            columns={columns}
            data={products}
            addAction={() => console.log('add')}
            initialState={{ density: 'compact' }}
            enableRowActions
            positionActionsColumn='last'
            renderRowActions={({ cell, row, table }) => (
                <>
                    <Tooltip title='Edit'>
                        <IconButton onClick={() => console.info('Edit')}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton onClick={() => deleteProduct(row.original.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        />
    )
}

export default ProductOverviewTable

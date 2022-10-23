import MaterialReactTable from 'material-react-table'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const ProductOverviewTable = ({}) => {
    const products = useSelector(state => state.products)

    const columns = useMemo(() => [
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
        },
    ])

    const rows = [...products.proxmox, ...products.pterodactyl]

    return <MaterialReactTable title='Products' columns={columns} data={rows} />
}

export default ProductOverviewTable

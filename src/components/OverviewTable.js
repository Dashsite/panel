import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import MaterialReactTable from 'material-react-table'
import AddIcon from '@mui/icons-material/Add'
import { IconButton, Typography } from '@mui/material'

const OverviewTable = ({ title, data, columns, addAction, ...props }) => {
    return (
        <MaterialReactTable
            initialState={{ density: 'compact' }}
            title={title}
            columns={columns}
            data={data}
            muiTableBodyCellProps={{ padding: 'none' }}
            enableDensityToggle={false}
            muiTablePaginationProps={{ rowsPerPageOptions: [15, 25, 50, 100], rowsPerPage: 15 }}
            renderTopToolbarCustomActions={({ table }) => {
                if (addAction) {
                    return (
                        <IconButton disableRipple onClick={addAction}>
                            <AddIcon />
                            <Typography variant='button'>Add</Typography>
                        </IconButton>
                    )
                }
            }}
            muiTablePaperProps={{
                sx: {
                    borderRadius: 2,
                    overflow: 'hidden',
                },
            }}
            {...props}
        />
    )
}

export default OverviewTable

OverviewTable.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    columns: PropTypes.array,
    deleteAction: PropTypes.func,
    disableAction: PropTypes.func,
    ...MaterialReactTable.propTypes,
}

import { useDispatch } from 'react-redux'
import MaterialReactTable from 'material-react-table'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Block from '@mui/icons-material/Block'
import { Chip, IconButton, Typography, Tooltip } from '@mui/material'

const UserOverviewTable = ({ users }) => {
    const dispatch = useDispatch()

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
            header: 'Role',
            accessorKey: 'role',
            Cell: ({ cell }) => {
                const role = cell.getValue()
                // same width for all roles
                const minWidth = '75px'
                return (
                    <Chip
                        label={role.toUpperCase()}
                        color={role === 'admin' ? 'primary' : 'secondary'}
                        variant='outlined'
                        sx={{ padding: 0, minWidth }}
                    />
                )
            },
        },
        {
            header: 'Created At',
            accessorFn: row => {
                // Accessor function just for formatting the date
                const date = new Date(row.createdAt)
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
                return date.toLocaleDateString(undefined, options)
            },
        },
        {
            header: 'Email Verified',
            accessorFn: row => {
                // Accessor function just for formatting the date
                const date = new Date(row.emailVerified)
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
                return date.toLocaleDateString(undefined, options)
            },
        },
        {
            header: 'Disabled',
            accessorKey: 'disabled',
            Cell: ({ cell }) => {
                const disabled = cell.getValue()
                return (
                    <Typography variant='body2' color={disabled ? 'error' : 'success'}>
                        {disabled ? 'Yes' : 'No'}
                    </Typography>
                )
            },
        },
    ]

    return (
        <MaterialReactTable
            initialState={{ density: 'compact' }}
            title='Users'
            columns={columns}
            data={users}
            muiTableBodyCellProps={{ padding: 'none' }}
            enableDensityToggle={false}
            muiTablePaginationProps={{ rowsPerPageOptions: [15, 25, 50, 100], rowsPerPage: 15 }}
            enableRowActions
            positionActionsColumn='last'
            renderRowActions={({ cell, row, table }) => (
                <>
                    <Tooltip title='Edit'>
                        <IconButton onClick={() => console.info('Edit')}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Disable'>
                        <IconButton
                            onClick={() => {
                                dispatch(disableUser(row.id))
                            }}
                        >
                            <Block />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton onClick={() => console.info('Delete')}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
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

export default UserOverviewTable

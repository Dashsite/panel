import { useDispatch } from 'react-redux'
import MaterialReactTable from 'material-react-table'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Block from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Chip, IconButton, Typography, Tooltip } from '@mui/material'

const UserOverviewTable = ({ users, deleteAction, disableAction }) => {
    const dispatch = useDispatch()

    const deleteUser = id => dispatch(deleteAction(id))
    const disableUser = (id, disabled) => {
        console.log('disabledUser', disabled)
        dispatch(disableAction(id, disabled))
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
                    {!row.original.disabled ? (
                        <Tooltip title='Disable'>
                            <IconButton
                                onClick={() => {
                                    disableUser(row.original.id, false)
                                }}
                            >
                                <Block />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title='Enable'>
                            <IconButton
                                onClick={() => {
                                    disableUser(row.original.id, true)
                                }}
                            >
                                <CheckCircleIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title='Delete'>
                        <IconButton onClick={() => deleteUser(row.original.id)}>
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

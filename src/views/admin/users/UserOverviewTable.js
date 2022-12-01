import { useDispatch } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Block from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Chip, IconButton, Typography, Tooltip } from '@mui/material'
import OverviewTable from 'src/components/OverviewTable'
import { EditAttributesRounded } from '@mui/icons-material'

const UserOverviewTable = ({ users, addAction, deleteAction, disableAction, editAction }) => {
    const dispatch = useDispatch()

    const deleteUser = id => dispatch(deleteAction(id))
    const disableUser = (id, disabled) => dispatch(disableAction(id, disabled))

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Username',
            accessorKey: 'username',
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
                        color={role === 'admin' ? 'red' : 'blue'}
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
                if (row.emailVerified === null) return 'No'

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
        <OverviewTable
            title='Users'
            columns={columns}
            data={users}
            addAction={() => addAction()}
            enableRowActions
            positionActionsColumn='last'
            renderRowActions={({ cell, row, table }) => (
                <>
                    <Tooltip title='Edit'>
                        <IconButton onClick={() => editAction(row.original)}>
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
        />
    )
}

export default UserOverviewTable

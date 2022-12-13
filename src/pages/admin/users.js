import { Alert, Box, Button, Divider, Typography, CardContent, Card as MuiCard } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getUsers, deleteUser, disableUser } from 'src/redux/actions/users'
import UserOverviewTable from 'src/views/admin/users/UserOverviewTable'
import UserForm from 'src/views/admin/users/UserForm'

const AdminUsersOverview = ({}) => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.system.users)
    const [mode, setMode] = useState('overview')
    const [selectedUser, setSelectedUser] = useState(null)

    const addAction = () => {
        setMode('add')
        setSelectedUser(null)
    }

    const editAction = user => {
        setSelectedUser(user)
        setMode('edit')
    }

    const cancelAction = () => {
        setSelectedUser(null)
        setMode('overview')
    }

    useEffect(() => {
        // dispatch the action to get the products
        dispatch(getUsers())
    }, [dispatch])

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant='h4' gutterBottom>
                Users
            </Typography>
            <Box>
                {mode === 'overview' && (
                    <UserOverviewTable
                        users={users}
                        addAction={addAction}
                        deleteAction={deleteUser}
                        disableAction={disableUser}
                        editAction={editAction}
                    />
                )}

                {mode === 'add' && <UserForm user={selectedUser} cancelAction={cancelAction} />}
                {mode === 'edit' && <UserForm user={selectedUser} cancelAction={cancelAction} />}
            </Box>
        </Box>
    )
}

AdminUsersOverview.adminProtected = true
export default AdminUsersOverview

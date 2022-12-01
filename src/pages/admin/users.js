import { Alert, Box, Button, Divider, Typography, CardContent, Card as MuiCard } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getUsers, deleteUser, disableUser } from 'src/redux/actions/users'
import UserOverviewTable from 'src/views/admin/users/UserOverviewTable'

const AdminUsersOverview = ({}) => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.system.users)

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
                <UserOverviewTable users={users} deleteAction={deleteUser} disableAction={disableUser} />
            </Box>
        </Box>
    )
}

AdminUsersOverview.adminProtected = true
export default AdminUsersOverview

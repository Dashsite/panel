import { createSlice } from '@reduxjs/toolkit'
import { success } from '@redux-requests/core'
import { getUsers, deleteUser, disableUser, createUser, updateUser } from '../actions/users'

const system = createSlice({
    name: 'system',
    initialState: {
        users: [],
    },
    extraReducers: {
        [success(getUsers)]: (state, { payload }) => {
            state.users = payload.data
        },
        [success(deleteUser)]: (state, { meta }) => {
            state.users = state.users.filter(
                user => user.id !== meta.requestAction.payload.request.url.split('/').pop()
            )
        },
        [success(disableUser)]: (state, { payload }) => {
            state.users = state.users.map(user => {
                if (user.id === payload.data.id) {
                    user = payload.data
                }
                return user
            })
        },
        [success(updateUser)]: (state, { payload }) => {
            state.users = state.users.map(user => {
                if (user.id === payload.data.id) {
                    user = payload.data
                }
                return user
            })
        },
        [success(createUser)]: (state, { payload }) => {
            state.users.push(payload.data)
        },
    },
})

export default system.reducer

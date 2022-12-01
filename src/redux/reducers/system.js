import { createSlice } from '@reduxjs/toolkit'
import { success } from '@redux-requests/core'
import { getUsers } from '../actions/users'

const system = createSlice({
    name: 'system',
    initialState: {
        users: [],
    },
    extraReducers: {
        [success(getUsers)]: (state, { payload }) => {
            state.users = payload.data
        },
    },
})

export default system.reducer

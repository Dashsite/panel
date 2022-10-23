import { createSlice } from '@reduxjs/toolkit'
import { success } from '@redux-requests/core'
import { getProxmoxProducts, getPterodactylProducts } from '../actions/products'

const products = createSlice({
    name: 'products',
    initialState: {
        pterodactyl: [],
        proxmox: [],
    },
    reducers: {},
    extraReducers: {
        [success(getPterodactylProducts)]: (state, { payload }) => {
            state.pterodactyl = payload.data
        },
        [success(getProxmoxProducts)]: (state, { payload }) => {
            state.proxmox = payload.data
        },
    },
})

export default products.reducer

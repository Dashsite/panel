import { createSlice } from '@reduxjs/toolkit'
import { success } from '@redux-requests/core'
import { getProxmoxProducts, getPterodactylProducts, getProvidersWithProducts } from '../actions/products'

const products = createSlice({
    name: 'products',
    initialState: {
        pterodactyl: [],
        proxmox: [],
        providers: [],
        categories: [],
    },
    reducers: {},
    extraReducers: {
        [success(getPterodactylProducts)]: (state, { payload }) => {
            state.pterodactyl = payload.data
        },
        [success(getProxmoxProducts)]: (state, { payload }) => {
            state.proxmox = payload.data
        },
        [success(getProvidersWithProducts)]: (state, { payload }) => {
            state.providers = payload.data
        },
    },
})

export default products.reducer

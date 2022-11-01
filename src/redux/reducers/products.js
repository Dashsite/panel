import { createSlice } from '@reduxjs/toolkit'
import { success } from '@redux-requests/core'
import {
    getProxmoxProducts,
    getPterodactylProducts,
    getProvidersWithProducts,
    deleteProxmoxProduct,
    deletePterodactylProduct,
} from '../actions/products'

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
        [success(deletePterodactylProduct)]: (state, action) => {
            //Get the id of the product to delete from the url
            const deletedProductId = Number(action.meta.requestAction.payload.request.url.split('/').pop())

            state.pterodactyl = state.pterodactyl.filter(product => product.id !== deletedProductId)
        },
        [success(deleteProxmoxProduct)]: (state, action) => {
            //Get the id of the product to delete from the url
            const deletedProductId = Number(action.meta.requestAction.payload.request.url.split('/').pop())

            state.proxmox = state.proxmox.filter(product => product.id !== deletedProductId)
        },
    },
})

export default products.reducer

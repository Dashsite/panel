import { createAction } from '@reduxjs/toolkit'

export const getPterodactylProducts = createAction('getPterodactylProducts', () => ({
    payload: {
        request: { url: `/products/pterodactyl`, method: 'GET' },
    },
}))

export const getProxmoxProducts = createAction('getProxmoxProducts', () => ({
    payload: {
        request: { url: `/products/proxmox`, method: 'GET' },
    },
}))

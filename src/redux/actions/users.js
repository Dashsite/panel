import { createAction } from '@reduxjs/toolkit'

export const getUsers = createAction('getUsers', () => ({
    payload: {
        request: { url: `/admin/users`, method: 'GET' },
    },
}))

export const deleteUser = createAction('deleteUser', id => ({
    payload: {
        request: { url: `/admin/users/${id}`, method: 'DELETE' },
    },
}))

export const disableUser = createAction('disableUser', (id, disabled) => ({
    payload: {
        request: { url: `/admin/users/${id}`, method: 'PATCH', data: { disabled: 'swada' } },
    },
}))

export const createUser = createAction('createUser', data => ({
    payload: {
        request: { url: `/admin/users`, method: 'POST', data },
    },
}))

export const updateUser = createAction('updateUser', (id, data) => ({
    payload: {
        request: { url: `/admin/users/${id}`, method: 'PATCH', data },
    },
}))

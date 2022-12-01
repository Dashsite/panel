import { createAction } from '@reduxjs/toolkit'

export const getUsers = createAction('getUsers', () => ({
    payload: {
        request: { url: `/admin/users`, method: 'GET' },
    },
}))

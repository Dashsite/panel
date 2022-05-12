import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { createDriver } from '@redux-requests/axios'
import { handleRequests } from '@redux-requests/core'
import rootReducers from './reducers'

import axiosInstance from 'src/configs/axiosInstance'

const setupStore = () => {
  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver(axiosInstance)
  })

  const reducer = combineReducers({
    requests: requestsReducer,
    ...rootReducers
  })

  return configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: true, immutableCheck: false }).concat(requestsMiddleware)
  })
}

const store = setupStore()

export default store

import axios from 'axios'

export const getApiUrl = () => (process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api')

const axiosInstance = axios.create({
    baseURL: getApiUrl(),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': 600,
    },
})

export default axiosInstance

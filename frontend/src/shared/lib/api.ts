import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

api.interceptors.response.use
    (
        (response) => {
            return response
        },

        (error) => {
            const response = error.response

            const normalizedError = {
                status: response?.data.status,
                errorCode: response?.data.errorCode,
                title: response?.data.title,
                detail: response?.data.detail
            }

            return Promise.reject(normalizedError)
        }

    )
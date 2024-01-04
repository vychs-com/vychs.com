import axios, { AxiosInstance, AxiosResponse } from 'axios'

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    withCredentials: true,
})

const wrapResponse = (response: AxiosResponse) => {
    if (response.status !== 200) {
        return null
    }

    const result = response.data?.data || null

    return {
        status: response.status,
        result,
    }
}

export { wrapResponse }
export default api

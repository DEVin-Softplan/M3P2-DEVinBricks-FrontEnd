import axios from "axios"
import env from 'react-dotenv'

const getURLBackend = () => {
    const { URL_BACKEND } = env
    return URL_BACKEND
}

export const cliente = axios.create({
    baseURL: getURLBackend()
})
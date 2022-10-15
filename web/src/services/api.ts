import axios from 'axios'

/** constante para comunicação com API */
export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL
})

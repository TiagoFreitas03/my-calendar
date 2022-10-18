import axios from 'axios'

import { API_URL } from '@env'

/** constante para comunicação com API */
export const api = axios.create({
	baseURL: API_URL
})

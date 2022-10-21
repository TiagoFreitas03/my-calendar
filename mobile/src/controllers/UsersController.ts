import { api } from '../services/api'
import { convertDateFormat } from '../utils/convertions'

/** campos para cadastro de usuário */
interface UserCreateData {
	/** nome */
	name: string
	/** e-mail */
	email: string
	/** senha */
	password: string
	/** data de nascimento */
	birth_date?: string
	/** foto de perfil */
	picture?: string
}

/** propriedades da resposta da API para autenticação do usuário */
interface AuthenticateResponse {
	/** mensagem de autenticação */
	message: string
	/** token para autenticação do usuário */
	token: string
}

/** controller de usuários */
export class UsersController {
	/** envia os dados cadastrais do usuário para a API e retorna a mensagem da API */
	async create({ name, email, password, birth_date, picture }: UserCreateData) {
		/** dados para enviar à API */
		const data = new FormData()

		data.append('name', name)
		data.append('email', email)
		data.append('password', password)

		if (birth_date)
			data.append('birth_date', convertDateFormat(birth_date))

		if (picture) {
			const filename = picture.split('/').pop()
			const match = /\.(\w+)$/.exec(filename ?? '')
  		const type = match ? `image/${match[1]}` : `image`

			data.append('picture', { uri: picture, name: filename, type } as any)
		}

		const res = await api.post('user', data, {
			headers: { 'content-type': 'multipart/form-data' }
		})

		return res.data.message as string
	}

	/**
	 * envia os dados do usuário para autenticação na API
	 * @param email e-mail do usuário
	 * @param password senha do usuário
	 */
	async login(email: string, password: string) {
		const res = await api.post('login', { email, password })

		return res.data as AuthenticateResponse
	}
}

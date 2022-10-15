import { api } from '../services/api'
import { User } from '../interfaces/User'

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
	picture?: File
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
	/** envia os dados cadastrais do usuário para a API */
	async create({ name, email, password, birth_date, picture }: UserCreateData) {
		/** dados para enviar à API */
		const data = new FormData()

		data.append('name', name)
		data.append('email', email)
		data.append('password', password)

		if (birth_date)
			data.append('birth_date', birth_date)

		if (picture)
			data.append('picture', picture)

		const res = await api.post('user', data)

		return res.data
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

	/** busca os dados do usuário logado */
	async show() {
		const res = await api.get('user')

		return res.data as User
	}
}

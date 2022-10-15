import { api } from '../services/api'

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

/** controller de usuários */
export class UsersController {
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
}

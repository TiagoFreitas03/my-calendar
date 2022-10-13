import { v4 as uuid } from 'uuid'

import { database } from '../database'

/** campos para cadastro do usuário */
export interface IUserData {
	name: string
	email: string
	password: string
	birth_date?: Date
	picture?: string
}

/** repositório de usuários */
export class UsersRepository {
	/**
	 * insere um usuário na tabela e retorna seu id
	 * @param data dados cadastrais do usuário
	 */
	async create(data: IUserData) {
		const user = await database.user.create({
			data: {
				id: uuid(),
				...data
			}
		})

		return user.id
	}

	/**
	 * busca e retorna um usuário filtrando pelo e-mail
	 * @param email e-mail utilizado como filtro
	 */
	findByEmail(email: string) {
		return database.user.findUnique({
			where: { email }
		})
	}
}

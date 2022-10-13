import { v4 as uuid } from 'uuid'

import { database } from '../database'
import { EntityNotFoundError } from '../errors/EntityNotFoundError'

/** Campos para cadastro do usuário */
export interface IUserData {
	name: string
	email: string
	password: string
	birth_date?: Date
	picture?: string
}

/** Repositório de usuários */
export class UsersRepository {
	/**
	 * Insere um usuário na tabela e retorna seu id
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
	 * Busca e retorna um usuário filtrando pelo e-mail
	 * @param email e-mail utilizado como filtro
	 */
	findByEmail(email: string) {
		return database.user.findUnique({
			where: { email }
		})
	}

	/**
	 * Busca um usuário pelo id. Se não encontrar, lança o erro EntityNotFoundError
	 * @param id id utilizando como filtro
	 */
	async findById(id: string) {
		const user = await database.user.findUnique({
			where: { id }
		})

		if (!user)
			throw new EntityNotFoundError('usuário', { id })

		return user
	}
}

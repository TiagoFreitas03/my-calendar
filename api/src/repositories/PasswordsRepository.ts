import { v4 as uuid } from 'uuid'

import { database } from "../database"
import { EntityNotFoundError } from '../errors/EntityNotFoundError'

/** Repositório de password */
export class PasswordsRepository {
	/** cadastra uma requisição de recuperação de senha */
	async create(email: string) {
		/** já existe uma requisição com o mesmo e-mail */
		const requestExists = await database.passwordRecoveryRequest.findUnique({
			where: { email }
		})

		if (requestExists) {
			await database.passwordRecoveryRequest.delete({
				where: { email },
			})
		}

		/** password recovery request */
		const prr = database.passwordRecoveryRequest.create({
			data: { id: uuid(), email }
		})

		return prr
	}

	/**
	 * busca um registro pelo id
	 * @param id id da requisição de recuperação de senha
	 * @returns registro da tabela password_recovery_requests
	 */
	async findById(id: string) {
		const prr = await database.passwordRecoveryRequest.findFirst({
			where: { id }
		})

		if (!prr)
			throw new EntityNotFoundError('requisição de recuperação de senha', { id })

		return prr
	}

	/**
	 * exclui requisição de recuperação de senha
	 * @param id id da requisição que será excluída
	 */
	async delete(id: string) {
		await database.passwordRecoveryRequest.delete({
			where: { id }
		})
	}

	/**
	 * atualiza a senha do usuário
	 * @param password nova senha do usuário
	 * @param email e-mail do usuário
	 */
	async update(password: string, email: string) {
		await database.user.update({
			where: { email },
			data: { password }
		})
	}
}

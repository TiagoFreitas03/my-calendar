import { v4 as uuid } from 'uuid'

import { database } from "../database"

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
}

import { resolve } from 'path'
import { compare, hash } from 'bcrypt'

import { Service } from "./_Service"
import { PasswordsRepository } from "../repositories/PasswordsRepository"
import { UsersRepository } from "../repositories/UsersRepository"
import { ApiError } from "../errors/ApiError"
import { Mailer } from '../utils/mailer'

/** service de passwords */
export class PasswordsService extends Service<PasswordsRepository> {
	constructor() {
		super(PasswordsRepository)
	}

	/**
	 * envia e-mail para recuperação de senha
	 * @param email email do usuário que deseja recuperar a senha
	 * @returns id da requisição de recuperação de senha
	 */
	async sendRecoverEmail(email: string) {
		const user = await new UsersRepository().findByEmail(email)

		if (!user)
			throw new ApiError('Usuário não encontrado.', 404)

		const { id } = await this.repository.create(email)

		const file = resolve(__dirname, '..', 'views', 'emails', 'ForgotPasswordMail.hbs')
		const link = `${process.env.WEB_APP}/reset_password/${id}`
		const variables = { name: user.name, link }

		await new Mailer().send(email, 'Recuperação de Senha', variables, file)

		if (process.env.ENV !== 'production')
			return id
	}

	/**
	 * recupera a senha do usuário
	 * @param id id da requisição de recuperação de senha
	 * @param password nova senha
	 */
	async reset(id: string, password: string) {
		if (!password || password.length < 6)
			throw new ApiError('Senha inválida.')

		const { email } = await this.repository.findById(id)
		const user = await new UsersRepository().findByEmail(email)

		if (!user)
			throw new ApiError('Usuário não encontrado', 401)

		if (await compare(password, user.password))
			throw new ApiError('A nova senha não pode ser igual a atual.')

		password = await hash(password, 8)

		await this.repository.delete(id)
		await this.repository.update(password, email)
	}
}

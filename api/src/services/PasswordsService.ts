import * as yup from 'yup'
import { resolve } from 'path'
import { compare, hash } from 'bcrypt'

import { Service } from "./_Service"
import { PasswordsRepository } from "../repositories/PasswordsRepository"
import { UsersRepository } from "../repositories/UsersRepository"
import { ApiError } from "../errors/ApiError"
import { Mailer } from '../utils/mailer'

/** campos para atualização de senha */
interface PasswordUpdate {
	/** senha atual */
	current: string
	/** nova senha */
	newPassword: string
	/** id do usuário */
	user_id: string
}

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

	/**
	 * atualiza a senha do usuário
	 * @param data dados para atualização de senha
	 */
	async edit(data: PasswordUpdate) {
		const schema = yup.object().shape({
			current: yup.string().required('Informe a senha atual'),
			newPassword: yup.string().required('Informe a nova senha').min(6, 'Senha muito curta'),
			user_id: yup.string().required('Usuário inválido')
		})

		await schema.validate(data, { abortEarly: false })

		const user = await new UsersRepository().findById(data.user_id)

		if (!await compare(data.current, user.password))
			throw new ApiError('Senha atual incorreta.')

		if (data.current === data.newPassword)
			throw new ApiError('A nova senha não pode ser igual a atual.')

		const password = await hash(data.newPassword, 8)
		await this.repository.update(password, undefined, user.id)
	}
}

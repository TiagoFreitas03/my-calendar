import 'dotenv/config'
import * as yup from 'yup'
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { ApiError } from '../errors/ApiError'
import { Service } from './_Service'
import { UsersRepository } from '../repositories/UsersRepository'
import { isDateValid } from '../utils/validations'
import { stringToDate } from '../utils/convertions'

/** campos para cadastro do usuário */
export interface IUserData {
	name: string
	email: string
	password: string
	birth_date?: string
	picture?: string
}

/** service de usuários */
export class UsersService extends Service<UsersRepository> {
	constructor() {
		super(UsersRepository)
	}

	/**
	 * cadastra um usuário e retorna seu id
	 * @param data dados cadastrais do usuário
	 */
	async create(data: IUserData) {
		const schema = yup.object().shape({
			name: yup.string().required('Informe seu nome'),
			email: yup.string().required('Informe seu e-mail').email('E-mail inválido'),
			password: yup.string().required('Informe sua senha').min(6, 'Senha muito curta'),
			birth_date: yup.string().test('match', 'Data de nascimento inválida', () => {
				return !data.birth_date ? true : isDateValid(data.birth_date)
			}),
			picture: yup.string()
		})

		await schema.validate(data, { abortEarly: false })

		if (await this.repository.findByEmail(data.email))
			throw new ApiError('Já existe um usuário com este e-mail.')

		const birth_date = data.birth_date ? stringToDate(data.birth_date) : undefined

		if (birth_date && birth_date > new Date())
			throw new ApiError('A data de nascimento não pode ser maior que a data atual')

		return this.repository.create({
			name: data.name,
			email: data.email,
			password: await hash(data.password, 8),
			birth_date,
			picture: data.picture
		})
	}

	/**
	 * realiza a autenticação do usuário e retorna o JWT
	 * @param email e-mail do usuário
	 * @param password senha do usuário
	 */
	async authenticate(email: string, password: string) {
		const user = await this.repository.findByEmail(email)

		if (!user || !await compare(password, user.password))
			throw new ApiError('Usuário e/ou senha incorreto(s).')

		const secret = process.env.JWT_SECRET ?? 'secret'

		return sign({ id: user.id }, secret)
	}
}

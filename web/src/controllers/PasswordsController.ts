import { api } from '../services/api'

/** controller de senhas */
export class PasswordsController {
	/**
	 * envia e-mail de recuperação de senha para o usuário
	 * @param email e-mail do usuário
	 */
	async retrieve(email: string) {
		const res = await api.post('password/forgot', { email })

		return res.data.message as string
	}

	/**
	 * envia à API os dados para redefinição de senha
	 * @param password nova senha
	 * @param id id da requisição de recuperação de senha
	 */
	async reset(password: string, id: string) {
		const res = await api.patch(`password/${id}`, { password })

		return res.data.message as string
	}

	/**
	 * envia à API os dados para atualização de senha
	 * @param current senha atual
	 * @param newPassword nova senha
	 */
	async update(current: string, newPassword: string) {
		const res = await api.patch('password', { current, newPassword })

		return res.data.message as string
	}
}

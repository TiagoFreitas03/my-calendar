import { api } from '../services/api'

/** controller de senhas */
export class PasswordsController {
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

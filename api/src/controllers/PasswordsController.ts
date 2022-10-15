import { Request, Response } from 'express'

import { Controller } from "./_Controller"
import { PasswordsService } from '../services/PasswordsService'
import { verifyJwt } from '../middlewares/auth'

/** controller de password */
export class PasswordsController extends Controller {
	constructor() {
		super('/password')

		this.routes = [
			// envio do e-mail para usuário que esqueceu a senha
			{ path: '/forgot', method: 'post', handler: this.forgot, middlewares: [] },
			// redefinição da senha
			{ path: '/:id', method: 'patch', handler: this.recover, middlewares: [] },
			// atualização de senha
			{ path: '', method: 'patch', handler: this.update, middlewares: [verifyJwt] }
		]
	}

	/** envia e-mail para o usuário que esqueceu a senha */
	async forgot(req: Request, res: Response) {
		const { email } = req.body

		/** id da requisição de recuperação de senha */
		const id = await new PasswordsService().sendRecoverEmail(email ?? '')

		return res.status(201).json({
			message: `Um e-mail foi enviado para: ${email}. ` +
				'Acesse sua caixa de entrada e siga as instruções para recuperar sua senha.',
			id
		})
	}

	/** recuperação da senha */
	async recover(req: Request, res: Response) {
		const { id } = req.params

		const { password } = req.body

		await new PasswordsService().reset(id, password)

		return res.json({ message: 'Senha recuperada.' })
	}

	/** atualização da senha */
	async update(req: Request, res: Response) {
		const { user_id } = req

		const { current, newPassword } = req.body

		await new PasswordsService().edit({ user_id, current, newPassword })

		return res.json({ message: 'Senha atualizada.' })
	}
}

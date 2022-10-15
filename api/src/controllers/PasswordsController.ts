import { Request, Response } from 'express'

import { Controller } from "./_Controller"
import { PasswordsService } from '../services/PasswordsService'

/** controller de password */
export class PasswordsController extends Controller {
	constructor() {
		super('/password')

		this.routes = [
			// envio do e-mail para usuário que esqueceu a senha
			{ path: '/forgot', method: 'post', handler: this.forgot, middlewares: [] },
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
}

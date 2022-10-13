import { Request, Response } from 'express'

import { Controller } from './_Controller'
import { UsersService } from '../services/UsersService'
import { upload } from '../middlewares/upload'

export class UsersController extends Controller {
	constructor() {
		super()

		this.routes = [
			// cadastro de usuário
			{
				path: '/user',
				method: 'post',
				handler: this.create,
				middlewares: [upload.single('picture')]
			}
		]
	}

	async create(req: Request, res: Response) {		
		const { name, email, password, birth_date } = req.body

		/** nome do arquivo da foto do usuário */
		const picture = req.file ? req.file.filename : undefined

		/** id do usuário cadastrado */
		const id = await new UsersService().create({ name, email, password, birth_date, picture })

		return res.status(201).json({ message: 'Usuário cadastrado', id })
	}
}

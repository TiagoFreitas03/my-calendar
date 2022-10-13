import { Request, Response } from 'express'

import { Controller } from './_Controller'
import { UsersService } from '../services/UsersService'
import { UsersView } from '../views/UsersView'
import { upload } from '../middlewares/upload'
import { verifyJwt } from '../middlewares/auth'

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
			},
			// autenticação do usuário
			{
				path: '/login',
				method: 'post',
				handler: this.login,
				middlewares: []
			},
			// busca de usuário por id
			{
				path: '/user',
				method: 'get',
				handler: this.show,
				middlewares: [verifyJwt]
			}
		]
	}

	/** cadastra usuário */
	async create(req: Request, res: Response) {		
		const { name, email, password, birth_date } = req.body

		/** nome do arquivo da foto do usuário */
		const picture = req.file ? req.file.filename : undefined

		/** id do usuário cadastrado */
		const id = await new UsersService().create({ name, email, password, birth_date, picture })

		return res.status(201).json({ message: 'Usuário cadastrado', id })
	}

	/** autentica usuário */
	async login(req: Request, res: Response) {
		const { email, password} = req.body

		/** JWT para identificação do usuário */
		const token = await new UsersService().authenticate(email ?? '', password ?? '')

		return res.json({ message: 'Usuário autenticado', token })
	}

	/** busca usuário pelo id */
	async show(req: Request, res: Response) {
		const { user_id } = req

		/** usuário */
		const user = await new UsersService().findById(user_id)

		return res.json(new UsersView().render(user))
	}
}

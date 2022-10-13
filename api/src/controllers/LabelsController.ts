import { Request, Response } from 'express'

import { Controller } from './_Controller'
import { LabelsService } from '../services/LabelsService'
import { verifyJwt } from '../middlewares/auth'

/** controller de labels */
export class LabelsController extends Controller {
	constructor() {
		super()

		this.routes = [
			// cadastro de label
			{
				path: '/label',
				method: 'post',
				handler: this.create,
				middlewares: [verifyJwt]
			}
		]
	}

	/** cadastro de label */
	async create(req: Request, res: Response) {
		const { name, color } = req.body

		const { user_id } = req

		/** id da label cadastrada*/
		const labelId = await new LabelsService().create({ name, color, user_id })

		return res.status(201).json({
			message: 'Etiqueta criada.', labelId
		})
	}
}

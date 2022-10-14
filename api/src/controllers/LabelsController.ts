import { Request, Response } from 'express'

import { Controller } from './_Controller'
import { LabelsService } from '../services/LabelsService'
import { LabelsView } from '../views/LabelsView'
import { verifyJwt } from '../middlewares/auth'

/** controller de labels */
export class LabelsController extends Controller {
	constructor() {
		super('/label')

		this.routes = [
			// cadastro de label
			{ path: '', method: 'post', handler: this.create, middlewares: [verifyJwt] },
			// pesquisa de labels
			{ path: '', method: 'get', handler: this.search, middlewares: [verifyJwt] }
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

	/** pesquisa labels filtrando pelo nome */
	async search(req: Request, res: Response) {
		const { name } = req.query

		const { user_id } = req

		const labels = await new LabelsService().search(name?.toString() ?? '', user_id)

		return res.json(new LabelsView().renderMany(labels))
	}
}

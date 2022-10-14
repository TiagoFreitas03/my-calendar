import { Request, Response } from 'express'

import { Controller } from './_Controller'
import { verifyJwt } from '../middlewares/auth'
import { EventsService } from '../services/EventsService'
import { toNumber } from '../utils/convertions'
import { EventsView } from '../views/EventsView'

/** controller de events */
export class EventsController extends Controller {
	constructor() {
		super('/event')

		const middlewares = [verifyJwt]

		this.routes = [
			// cadastro de evento
			{ path: '', method: 'post', handler: this.create, middlewares },
			// atualização de evento
			{ path: '/:id',  method: 'patch', handler: this.update, middlewares },
			// pesquisa de evento por nome
			{ path: '', method: 'get', handler: this.search, middlewares }
		]
	}

	/** cadastro de evento */
	async create(req: Request, res: Response) {
		const { name, description, start, end, notify, labels_ids } = req.body

		const { user_id } = req

		/** id do evento */
		const event = await new EventsService().create({
			name, description, start, end, notify, labels_ids, user_id
		})

		return res.status(201).json({ message: 'Compromisso cadastrado', event })
	}

	/** atualização de evento */
	async update(req: Request, res: Response) {
		const { name, description, start, end, notify, labels_ids } = req.body

		const { id } = req.params
		const { user_id } = req

		await new EventsService().edit({
			name, description, start, end, notify, labels_ids, user_id
		}, id)

		return res.json({ message: 'Compromisso atualizado' })
	}

	async search(req: Request, res: Response) {
		const { name, page, limit } = req.query

		const { user_id } = req

		const { events, pages } = await new EventsService().findByName({
			name: name?.toString(),
			user_id,
			page: toNumber(page, 1),
			limit: toNumber(limit, 20)
		})

		return res.json({
			events: new EventsView().renderMany(events),
			pages
		})
	}
}

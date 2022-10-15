import { Request, Response } from 'express'

import { Controller } from './_Controller'
import { verifyJwt } from '../middlewares/auth'
import { EventsService } from '../services/EventsService'
import { stringToDate, toNumber } from '../utils/convertions'
import { EventsView } from '../views/EventsView'
import { isDateValid } from '../utils/validations'

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
			{ path: '', method: 'get', handler: this.search, middlewares },
			// busca de eventos por referência
			{ path: '_month/:reference', method: 'get', handler: this.findByReference, middlewares },
			// busca eventos numa data
			{ path: '_day/:date', method: 'get', handler: this.findByDate, middlewares },
			// busca evento pelo id
			{ path: '/:id', method: 'get', handler: this.show, middlewares },
			// exclusão de evento
			{ path: '/:id', method: 'delete', handler: this.delete, middlewares }
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

	/** pesquisa de evento filtrando pelo nome */
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

	/** busca de eventos por período de referência */
	async findByReference(req: Request, res: Response) {
		const { reference } = req.params
		const { user_id } = req

		let date = new Date()

		if (isDateValid(reference))
			date = stringToDate(reference)

		const [month, year] = [date.getMonth(), date.getFullYear()]

		const events = await new EventsService().findByReference({ month, year, user_id })

		return res.json(new EventsView().renderMany(events))
	}

	/** busca eventos numa data específica */
	async findByDate(req: Request, res: Response) {
		const { date } = req.params
		const { user_id } = req

		let d = new Date()

		if (isDateValid(date))
			d = stringToDate(date)

		const events = await new EventsService().findByDate(d, user_id)

		return res.json(new EventsView().renderMany(events))
	}

	/** busca um evento pelo id */
	async show(req: Request, res: Response) {
		const { id } = req.params
		const { user_id } = req

		const event = await new EventsService().findById(id, user_id)

		return res.json(new EventsView().render(event))
	}

	/** exclui um evento pelo id */
	async delete(req: Request, res: Response) {
		const { id } = req.params
		const { user_id } = req

		await new EventsService().delete(id, user_id)

		return res.json({ message: 'Compromisso excluído' })
	}
}

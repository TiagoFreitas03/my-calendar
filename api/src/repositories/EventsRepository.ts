import { v4 as uuid } from 'uuid'

import { database } from '../database'
import { EntityNotFoundError } from '../errors/EntityNotFoundError'
import { EventSearchFilters, EventBase, EventLabel } from '../interfaces/Event'

/** dados do evento */
interface EventData extends EventBase {
	start: Date
	end: Date | null
	notified: boolean
	labels: EventLabel[]
}

/** dados para cadastro de evento */
interface EventCreate extends EventData {
}

/** Repositório de eventos */
export class EventsRepository {
	/**
	 * cadastra evento no banco de dados
	 * @param data dados para cadastro do evento
	 */
	async create({ labels, ...data }: EventCreate) {
		const event = await database.event.create({
			data: {
				id: uuid(),
				...data,
				labels: {
					createMany: { data: labels }
				}
			}
		})

		return event.id
	}

	/**
	 * busca e retorna um evento filtrando pelo id
	 * @param id id do evento
	 */
	async findById(id: string) {
		const event = await database.event.findFirst({
			where: { id },
		})

		if (!event)
			throw new EntityNotFoundError('evento', { id })

		return event
	}

	/**
	 * atualiza dados do evento
	 * @param id id do evento
	 * @param data dados para serem atualizados
	 */
	async update(id: string, { labels, ...data }: EventData) {
		const event = await database.event.update({
			where: { id },
			data,
			include: { labels: true }
		})

		let labelsIds = labels.map(label => label.label_id)

		/** labels to remove */
		const remove = event.labels.map(label => {
			return labelsIds.includes(label.label_id) ? 0 : label.label_id
		}).filter(label => label !== 0)

		labelsIds = event.labels.map(label => label.label_id)

		/** labels to add */
		const add = labels.map(label => {
			return labelsIds.includes(label.label_id) ? 0 : label.label_id
		}).filter(label => label !== 0)

		for (let label of remove) {
			await database.eventLabel.delete({
				where: {
					event_id_label_id: { event_id: id, label_id: label }
				}
			})
		}

		for (let label of add) {
			await database.eventLabel.create({
				data: { event_id: id, label_id: label }
			})
		}
	}

	/** busca e retorna lista de eventos filtrados pelo nome */
	async searchByName({ name, user_id, limit, page }: EventSearchFilters) {
		const filters = name ?
			{ name: { contains: name }, user_id } :
			{ start: { gt: new Date() }, user_id }

		const events = await database.event.findMany({
			where: filters,
			orderBy: [{ start: 'asc' }, { name: 'asc' }],
			take: limit,
			skip: (limit * page) - limit
		})

		const count = await database.event.count({
			where: filters
		})

		return { events, pages: Math.ceil(count / limit) }
	}
}

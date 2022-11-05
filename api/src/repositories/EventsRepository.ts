import { v4 as uuid } from 'uuid'

import { database } from '../database'
import { EntityNotFoundError } from '../errors/EntityNotFoundError'
import { EventSearchFilters, EventBase, EventReferenceFilters } from '../interfaces/Event'

/** dados do evento */
interface EventData extends EventBase {
	start: Date
	end: Date | null
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
	async create(data: EventCreate) {
		const event = await database.event.create({
			data: {
				id: uuid(),
				...data
			}
		})

		return event.id
	}

	/**
	 * busca e retorna um evento filtrando pelo id
	 * @param id id do evento
	 * @param relations tabelas relacionadas que devem ser incluídas na busca
	 */
	async findById(id: string) {
		const event = await database.event.findFirst({
			where: { id }
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
	async update(id: string, data: EventData) {
		await database.event.update({
			where: { id },
			data
		})
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

	/** busca eventos por período de referência */
	searchByReference({ year, month, user_id }: EventReferenceFilters) {
		const start = new Date(year, month, 1)
		start.setHours(0, 0, 0, 0) // Início do dia

		const end = new Date(year, month + 1, 0)
		end.setHours(23, 59, 59, 999) // Fim do dia

		return database.event.findMany({
			where: {
				start: { gte: start, lte: end },
				user_id
			},
			orderBy: [{ start: 'asc' }, { name: 'asc' }]
		})
	}

	/** busca eventos numa data específica */
	searchByDate(date: Date, user_id: string) {
		const start = new Date(date.setHours(0, 0, 0, 0)) // Início do dia
		const end = new Date(date.setHours(23, 59, 59, 999)) // Fim do dia

		return database.event.findMany({
			where: {
				start: { gte: start, lte: end },
				user_id
			},
			orderBy: [{ start: 'asc' }, { name: 'asc' }]
		})
	}

	/**
	 * exclui um evento do banco de dados
	 * @param id id do evento a ser excluído
	 */
	async delete(id: string) {
		await database.event.delete({
			where: { id }
		})
	}
}

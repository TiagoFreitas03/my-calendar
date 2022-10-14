import { v4 as uuid } from 'uuid'

import { database } from '../database'
import { EntityNotFoundError } from '../errors/EntityNotFoundError'

/** dados do evento */
interface EventData {
	name: string
	description: string | null
	start: Date
	end: Date | null
	notified: boolean
	user_id: string
}

/** dados para cadastro de evento */
interface EventCreate extends EventData {
	labels: EventLabel[]
}

/** Dados para adicionar label ao event */
interface EventLabel {
	label_id: number
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
	async update(id: string, data: EventData) {
		await database.event.update({
			where: { id },
			data
		})
	}
}

import { v4 as uuid } from 'uuid'

import { database } from '../database'

/** Dados para cadastro/atualização de evento */
interface EventData {
	name: string
	description: string | null
	start: Date
	end: Date | null
	notified: boolean
	user_id: string
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
	async create(data: EventData) {
		const { labels, ...rest } = data

		const event = await database.event.create({
			data: {
				id: uuid(),
				...rest,
				labels: {
					createMany: { data: labels }
				}
			}
		})

		return event.id
	}
}

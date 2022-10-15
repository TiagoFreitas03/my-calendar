import { format } from 'date-fns'

import { api } from '../services/api'
import { Event } from '../interfaces/Event'

/** dados para cadastro/atualização de evento */
interface EventData {
	name: string
	description?: string
	start: string
	end?: string
	notify: boolean
	labels_ids?: number[]
}

/** propriedades da resposta da API para a crição de um evento  */
interface CreateEventResponse {
	/** mensagem */
	message: string
	/** id do evento */
	event: string
}

/** controller de eventos */
export class EventsController {
	/**
	 * envia dados para cadastro de evento à API
	 * @param data dados para cadastro do evento
	 */
	async create(data: EventData) {
		const res = await api.post('event', data)

		return res.data as CreateEventResponse
	}

	/**
	 * envia dados para edição do evento à API
	 * @param data dados do evento
	 * @param id id do evento que será atualizado
	 */
	async edit(data: EventData, id: string) {
		const res = await api.patch(`event/${id}`, data)

		return res.data.message as string
	}

	/** busca eventos por período de referência */
	async searchByReference(date: Date) {
		const ref = format(date, 'yyyy-MM-dd')

		const res = await api.get(`event_month/${ref}`)

		return res.data as Event[]
	}

	/**
	 * busca um evento pelo id
	 * @param id id do evento
	 */
	async findById(id: string) {
		const res = await api.get(`event/${id}`)

		return res.data as Event
	}
}

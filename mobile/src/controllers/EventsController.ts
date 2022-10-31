import { format } from 'date-fns'

import { api } from '../services/api'
import { Event } from '../interfaces/Event'

/** dados para cadastro/atualização de evento */
interface EventData {
	name: string
	description?: string
	start: string
	end?: string
	labels_ids?: number[]
}

/** propriedades da resposta da API para a crição de um evento  */
interface CreateEventResponse {
	/** mensagem */
	message: string
	/** id do evento */
	event: string
}

/** propriedades da resposta da pesquisa de evento por nome */
interface SearchEventResponse {
	/** lista de eventos */
	events: Event[]
	/** número de páginas da busca */
	pages: number
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

	/**
	 * busca e retorna eventos filtrados por nome
	 * @param name nome do evento
	 * @param page página atual da pesquisa
	 * @param limit limite de eventos por página
	 */
	async searchByName(name?: string, page?: number, limit?: number) {
		const filters: string[] = []

		if (name)
			filters.push(`name=${name}`)

		if (page)
			filters.push(`page=${page}`)

		if (limit)
			filters.push(`limit=${limit}`)

		const res = await api.get(`event?${filters.join('&')}`)

		return res.data as SearchEventResponse
	}

	/** busca eventos por período de referência */
	async searchByReference(date: Date) {
		const ref = format(date, 'yyyy-MM-dd')

		const res = await api.get(`event_month/${ref}`)

		return res.data as Event[]
	}

	/**
	 * busca eventos na data especificada
	 * @param date data para filtrar os eventos
	 */
	async searchByDay(date: Date) {
		const ref = format(date, 'yyyy-MM-dd')

		const res = await api.get(`event_day/${ref}`)

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

	/**
	 * envia à API uma requisição para excluir o evento
	 * @param id id do evento que será excluído
	 */
	async delete(id: string) {
		const res = await api.delete(`event/${id}`)

		return res.data.message as string
	}
}

import * as yup from 'yup'

import { Service } from "./_Service"
import { EventsRepository } from "../repositories/EventsRepository"
import { LabelsRepository } from '../repositories/LabelsRepository'
import { isDateTime, hasDuplicates } from '../utils/validations'
import { ApiError } from '../errors/ApiError'
import {
	EventSearchFilters, EventBase, EventLabel, EventReferenceFilters
} from '../interfaces/Event'

/** dados para cadastro/atualização de evento */
interface EventData extends EventBase {
	start: string
	end?: string
	notify: boolean
	labels_ids: number[]
}

/** service de eventos */
export class EventsService extends Service<EventsRepository> {
	constructor() {
		super(EventsRepository)
	}

	/** valida dados do cadastro/edição do evento */
	async validate(data: EventData) {
		const { start, end, notify, labels_ids, ...rest } = data

		const schema = yup.object().shape({
			name: yup.string().required('Informe o nome do compromisso'),
			description: yup.string(),
			start: yup.string().required('Informe o início')
				.test('matches', 'Data inválida', () => isDateTime(start)),
			end: yup.string()
				.test('matches', 'Data inválida', () => !end ? true : isDateTime(end)),
			user_id: yup.string().required('Usuário inválido'),
			labels_ids: yup.array(yup.number().required('Etiqueta inválida'))
				.test('matches', 'Etiquetas repetidas', () => !hasDuplicates(labels_ids ?? []))
		})

		await schema.validate(data, { abortEarly: false })

		/** labels do evento */
		const labels: EventLabel[] = []
		/** repositório de labels */
		const labelsRepository = new LabelsRepository()

		if (labels_ids && labels_ids.length > 0) {
			for (let id of labels_ids) {
				const label = await labelsRepository.findById(id)

				if (label.user_id === data.user_id)
					labels.push({ label_id: label.id })
			}
		}

		/** data de início */
		const s = new Date(start)
		/** data de fim */
		const e = end ? new Date(end) : null

		if (e && e.getTime() <= s.getTime())
			throw new ApiError('Intervalo de datas/horários inválido')

		return { ...rest, start: s, end: e, notified: !notify, labels }
	}

	/**
	 * cadastra evento no banco de dados e retorna o seu id
	 * @param requestData dados para cadastro do evento
	 */
	async create(requestData: EventData) {
		/** dados validados */
		const data = await this.validate(requestData)

		return this.repository.create(data)
	}

	/**
	 * edição dos dados do evento
	 * @param requestData dados de atualização do evento
	 * @param id id do evento que será atualizado
	 */
	async edit(requestData: EventData, id: string) {
		const event = await this.repository.findById(id)

		if (event.user_id !== requestData.user_id)
			throw new ApiError('Você não pode editar este evento.', 401)

		const data = await this.validate(requestData)

		await this.repository.update(id, data)
	}

	/**
	 * pesquisa eventos filtrando pelo nome
	 * @param filters filtros para a pesquisa de eventos (página, limite, nome e id do usuário)
	 */
	findByName = (filters: EventSearchFilters) => this.repository.searchByName(filters)

	/**
	 * busca eventos pelo período de referência
	 * @param filters filtros para busca por referência (mês, ano e id do usuário)
	 */
	findByReference = (filters: EventReferenceFilters) => this.repository.searchByReference(filters)

	/**
	 * busca eventos numa data específica
	 * @param date data dos eventos buscados
	 * @param user_id id do usuário fazendo a busca
	 */
	findByDate = (date: Date, user_id: string) => this.repository.searchByDate(date, user_id)

	/**
	 * busca um evento pelo id
	 * @param id id do evento
	 * @param user_id id do usuário fazendo a pesquisa
	 */
	async findById(id: string, user_id: string) {
		const event = await this.repository.findById(id, ['labels'])

		if (event.user_id !== user_id)
			throw new ApiError('Você não pode visualizar este evento.', 401)

		return event
	}

	/**
	 * exclui um evento do banco de dados
	 * @param id id do evento que será excluído
	 * @param user_id id do usuário que está excluindo o evento
	 */
	 async delete(id: string, user_id: string) {
		const event = await this.repository.findById(id)

		if (event.user_id !== user_id)
			throw new ApiError('Você não pode excluir este evento.', 401)

		await this.repository.delete(id)
	}
}

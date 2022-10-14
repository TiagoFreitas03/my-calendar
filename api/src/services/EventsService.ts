import * as yup from 'yup'

import { Service } from "./_Service"
import { EventsRepository } from "../repositories/EventsRepository"
import { LabelsRepository } from '../repositories/LabelsRepository'
import { isDateTime, hasDuplicates } from '../utils/validations'
import { ApiError } from '../errors/ApiError'

/** dados para cadastro/atualização de evento */
interface EventData {
	name: string
	description: string | null
	start: string
	end?: string
	notify: boolean
	user_id: string
	labels_ids: number[]
}

/** dados da label do event */
interface EventLabel {
	label_id: number
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

		for (let id of labels_ids) {
			const label = await labelsRepository.findById(id)

			if (label.user_id === data.user_id)
				labels.push({ label_id: label.id })
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

		const { labels,...data } = await this.validate(requestData)

		await this.repository.update(id, data)
	}
}

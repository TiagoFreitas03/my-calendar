import { format } from 'date-fns'

import { api } from '../services/api'
import { Event } from '../interfaces/Event'

/** controller de eventos */
export class EventsController {
	/** busca eventos por período de referência */
	async searchByReference(date: Date) {
		const ref = format(date, 'yyyy-MM-dd')

		const res = await api.get(`event_month/${ref}`)

		return res.data as Event[]
	}
}

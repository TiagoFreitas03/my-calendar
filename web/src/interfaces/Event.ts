import { Label } from './Label'

/** informações do evento */
export interface Event {
	/** id */
	id: string

	/** nome */
	name: string

	/** descrição */
	description?: string

	/** data e hora de início escrito por extenso */
	start: string

	/** data e hora de fim escrito por extenso */
	end?: string

	/** data de início no formato YYYY-MM-DD */
	startDate: string

	/** hora de início no formato HH:MM */
	startTime: string

	/** data de fim no formato YYYY-MM-DD */
	endDate?: string

	/** hora de fim no formato HH:MM */
	endTime?: string

	/** data de criação do escrito por extenso */
	created_at: string

	/** etiquetas do evento */
	labels?: Label[]
}

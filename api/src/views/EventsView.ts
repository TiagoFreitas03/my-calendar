import { Event as EventModel } from '@prisma/client'

import { View } from './_View'
import { datetimeToString, dateToString, timeToString } from '../utils/convertions'

/** campos retornados pela view */
interface EventView {
	id: string
	name: string
	description: string | null
	start: string
	end?: string
	startDate: string
	startTime: string
	endDate?: string
	endTime?: string
	created_at: string
}

/** view de events */
export class EventsView extends View<EventModel, EventView> {
	render(event: EventModel) {
		const { id, name, description, start, end, created_at } = event

		return {
			id,
			name,
			description,
			start: datetimeToString(start),
			end: end ? datetimeToString(end) : undefined,
			startDate: dateToString(start, 'YYYY-MM-DD'),
			startTime: timeToString(start),
			endDate: end ? dateToString(end, 'YYYY-MM-DD') : undefined,
			endTime: end ? timeToString(end) : undefined,
			created_at: dateToString(created_at)
		}
	}
}

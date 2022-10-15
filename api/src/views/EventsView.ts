import { Event, EventLabel, Label } from '@prisma/client'

import { View } from './_View'
import { LabelsView, LabelView } from './LabelsView'
import { datetimeToString, dateToString, timeToString } from '../utils/convertions'

/** tipagem do event recebido pelo método render da view */
type EventModel = Event & {
	labels?: (EventLabel & {
		label: Label
	})[]
}

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
	labels: LabelView[] | undefined
}

/** view de events */
export class EventsView extends View<EventModel, EventView> {
	render(event: EventModel) {
		const { id, name, description, start, end, created_at, labels } = event

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
			created_at: dateToString(created_at),
			labels: labels ? labels.map(el => new LabelsView().render(el.label)) : undefined
		}
	}
}

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { isValid, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Event } from '../../interfaces/Event'
import { EventsController } from '../../controllers/EventsController'
import { toDate } from '../../utils/convertions'

/** página de eventos do dia */
export function DayEvents() {
	const [events, setEvents] = useState<Event[]>([])
	const [dateFormatted, setDateFormatted] = useState('')

	const { date } = useParams<{ date: string }>()

	useEffect(() => {
		let param = format(new Date(), 'yyyy-MM-dd')

		if (date && !isValid(date))
			param = date

		const d = toDate(param)
		setDateFormatted(format(d, "dd MMMM yyyy", { locale: ptBR }))

		new EventsController().searchByDay(d).then(data => setEvents(data))
	}, [date])

	return (
		<div className="px-8 py-6 w-full md:w-[720px] mx-auto">
			{events.length === 0 ?
				<div>
					<h2>Nenhum evento neste dia...</h2><br />

					<p>
						Clique <Link to={'/create_event'} className="text-blue-500">
							aqui
						</Link> para cadastrar
					</p>
				</div> :
				<div>
					<h2>Eventos em {dateFormatted}</h2> <br />

					{events.map(event => {
						return (
							<Link
								key={event.id}
								to={`/event/${event.id}`}
								className="block rounded-md py-6 px-4 mb-4 border border-gray-500 hover:border-gray-300"
							>
								{event.name}
								<span className="block text-xs mt-2 text-gray-300">{event.start}</span>
							</Link>
						)
					})}
				</div>
			}
		</div>
	)
}

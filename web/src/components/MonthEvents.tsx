import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { EventsController } from "../controllers/EventsController"
import { Event } from "../interfaces/Event"
import { useAuth } from '../contexts/AuthContext'
import { Reference } from "../interfaces/Date"

/** container para eventos no mês e ano */
export function MonthEvents({ month, year }: Reference) {
	const { signed } = useAuth()

	const [events, setEvents] = useState<Event[]>([])

	useEffect(() => {
		if (signed) {
			new EventsController().searchByReference(new Date(year, month, 1)).then(data => {
				setEvents(data)
			})
		}
	}, [month, year, signed])

	if (!signed) {
		return (
			<div
				className={
					'lg:block hidden p-4 rounded bg-gray-700 w-[25%] overflow-y-auto max-h-[1080px]'
				}
			>
				<p>Faça login para visualizar seus próximos eventos</p>
			</div>
		)
	}

	return (
		<div
			className='lg:block hidden p-4 rounded bg-gray-700 w-[25%] overflow-y-auto max-h-[1080px]'
		>
			<header>
				<strong className='text-xl'>Neste mês</strong>
			</header>

			<main>
				{events.length > 0 ?
					<>
						{events.map(event => {
							return (
								<Link
									key={event.id}
									className="block bg-gray-900 my-2 p-4 rounded-lg"
									to={`/event/${event.id}`}
								>
									<strong className="block mb-2">{event.name}</strong>
									<span className="block">{event.start}</span>
								</Link>
							)
						})}
					</> :
					<p className="mt-4">Nenhum evento neste mês</p>
				}
			</main>
		</div>
	)
}

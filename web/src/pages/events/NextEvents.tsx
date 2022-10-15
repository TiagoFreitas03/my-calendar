import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

import { Input } from "../../components/Input"
import { Pagination } from "../../components/Pagination"
import { EventsController } from "../../controllers/EventsController"
import { Event } from '../../interfaces/Event'
import { toNumber } from '../../utils/convertions'

/** página de exibição dos próximos evento e busca de evento por nome */
export function NextEvents() {
	const [name, setName] = useState('')
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [events, setEvents] = useState<Event[]>([])
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		new EventsController().searchByName(name, page, limit).then(data => {
			setEvents(data.events)
			setTotalPages(data.pages)
		})
	}, [name, limit, page])

	return (
		<div className="block w-full md:w-[720px] mx-auto px-4">
			<div className="flex gap-3 mt-4">
				<div className="w-[75%] mt-2">
					<Input
						label="Pesquise pelo nome do evento..."
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>

				<div className="w-[25%] mt-2">
					<label className="block mb-2">Qtd por página</label>

					<select
						value={limit}
						onChange={e => setLimit(toNumber(e.target.value, limit))}
						className="border rounded w-full py-2.5 px-3 mb-3 text-gray-900 bg-white"
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={30}>30</option>
					</select>
				</div>
			</div>

			{events.length > 0 ? (
				<Pagination current={page} total={totalPages} onChange={(pg) => setPage(pg)}>
					{events.map(event => {
						return (
							<Link
								key={event.id}
								to={`/event/${event.id}`}
								className={
									"block rounded-md py-6 px-4 mb-4 border border-gray-500 hover:border-gray-300"
								}
							>
								{event.name}
								<span className="block text-xs mt-2 text-gray-300">{event.start}</span>
							</Link>
						)
					})}
				</Pagination>
			) : (
				<p>Nenhum compromisso/evento encontrado.</p>
			)}
		</div>
	)
}

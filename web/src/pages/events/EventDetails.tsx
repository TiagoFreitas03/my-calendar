import { useState, useEffect } from 'react'
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom'
import { Labels } from '../../components/Labels'
import { useAlert } from '../../contexts/AlertContext'

import { EventsController } from '../../controllers/EventsController'
import { Event } from '../../interfaces/Event'

/** página de detalhes do evento */
export function EventDetails() {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const { show } = useAlert()

	const [event, setEvent] = useState<Event>()

	if (!id) {
		return (<Navigate to='/' replace />)
	}

	useEffect(() => {
		new EventsController().findById(id).then(data => setEvent(data))
	}, [id])

	/**
	 * trata o evento de clique do botão de exclusão do evento
	 * @param event_id id do evento que será excluído
	 */
	async function handleDeleteEventClick(event_id: string) {
		try {
			const message = await new EventsController().delete(event_id)

			show('Tudo certo!', message)

			navigate('/')
		} catch (err: any) {
			const { message } = err.response.data

			show('Ocorreu um erro!', message)
		}
	}

	return (
		<div className='w-full md:w-[720px] mx-auto px-4 pt-4'>
			{ event ? (
				<div className='leading-8'>
					<div className='flex justify-between mb-8 mt-4'>
						<h2>{event.name}</h2>

						<div>
							<Link
								className='border-2 border-purple-500 rounded-lg p-2 cursor-pointer mr-2'
								to={`/edit_event/${event.id}`}
							>
								<i className='fa-solid fa-pencil' />
							</Link>

							<button
								className='border-2 border-pink-500 rounded-lg px-2.5 py-0.5 cursor-pointer'
								onClick={() => handleDeleteEventClick(event.id)}
							>
								<i className='fa-solid fa-trash' />
							</button>
						</div>
					</div>

					{ event.description && <p className='mb-4'>{event.description}</p> }

					<p className='mb-4'>Início: {event.start}</p>

					{ event.end && <p className='mb-4'>Fim: {event.end}</p> }

					{ event.labels && event.labels.length > 0  && <>
						<h3 className='text-lg mt-8'>Etiquetas</h3>

						<Labels data={event.labels} />
					</>}
				</div>
			) : (
				<p>O evento não foi encontrado.</p>
			) }
		</div>
	)
}

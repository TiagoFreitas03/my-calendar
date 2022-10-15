import { useState, useEffect } from 'react'

import { getSpecialDates } from '../utils/dates'
import { Reference, SpecialDate } from '../interfaces/Date'
import { Subtitle } from './Subtitle'
import { COLORS } from '../theme'

/** container de datas especiais do mês/ano */
export function SpecialDates({ month, year }: Reference) {
	const [dates, setDates] = useState<SpecialDate[]>([])

	useEffect(() => {
		const specialDates = getSpecialDates(month, year)
		setDates(specialDates.dates)
	}, [month, year])

	return (
		<div className='mt-6'>
			<div className='md:max-w-[50vw]'>
				<Subtitle color='BLUE' text='Feriado' />
				<Subtitle color='PURPLE' text='Data Comemorativa' />
				<Subtitle color='PINK' text='Ponto Facultativo' />
				<Subtitle color='ORANGE' text='Hoje' />
				<Subtitle color='YELLOW' text='Selecionado' />
			</div>

			<div className='bg-gray-700 rounded-lg p-5 mt-4'>
				<h4>Feriados e Datas Comemorativas:</h4>

				{dates.length > 0 ?
					dates.map((date, index) => {
						return (
							<p key={index} className="flex my-3 items-center">
								<span
									className='w-8 py-1 text-center rounded-md mr-2'
									style={{ background: date.type === 'FN' ? COLORS.BLUE :
										date.type === 'DC' ? COLORS.PURPLE : COLORS.PINK
									}}
								>
									{date.day}
								</span>
								{date.name}
							</p>
						)
					}) :
					<p className='mt-2'>Nenhum feriado ou data comemorativa este mês.</p>
				}
			</div>
		</div>
	)
}

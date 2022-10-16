import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format, sub, add } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { IconButton } from '../components/IconButton'
import { SpecialDates } from '../components/SpecialDates'
import { MonthEvents } from '../components/MonthEvents'

import { isToday } from '../utils/dates'
import { toNumber } from '../utils/convertions'
import { COLORS } from '../theme'
import { DatesController } from '../controllers/DatesController'
import { Dates } from '../interfaces/Date'

const WEEK_DAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

export function Home() {
	const [date, setDate] = useState(new Date())
	const [specialDates, setSpecialDates] = useState<Dates>()

	const month = date.getMonth()
	const year = date.getFullYear()

	const navigate = useNavigate()

	useEffect(() => {
		/** datas especiais */
		new DatesController().listByReference({ month: month + 1, year }).then(dates => {
			setSpecialDates(dates)
		})
	}, [month, year])

	/** decrementa o ano em 1 */
	const decrementYear = () => setDate(sub(date, { years: 1 }))

	/** incrementa o ano em 1 */
	const incrementYear = () => setDate(add(date, { years: 1 }))

	/** decrementa o mês em 1 */
	const decrementMonth = () => setDate(sub(date, { months: 1 }))

	/** incrementa o mês em 1 */
	const incrementMonth = () => setDate(add(date, { months: 1 }))

	/**
	 * altera a data selecionada
	 * @param day número do dia selecionado
	 */
	const changeSelectedDate = (day: number) => {
		if (day > 0) {
			if (day === date.getDate())
				return navigate(`/day_events/${format(date, 'yyyy-MM-dd')}`)

			const newDate = new Date(year, month, day)
			setDate(newDate)
		}
	}

	/** dias do mês */
	const monthDays = useMemo(() => {
		const days: string[][] = [[]]

		const firstDay = new Date(year, month, 1)
		const lastDay = new Date(year, month + 1, 0).getDate()

		while (days[0].length < firstDay.getDay())
			days[0].push('')

		for (let i = 1; i <= lastDay; i++) {
			if (days[days.length - 1].length === 7)
				days.push([])

			days[days.length - 1].push(i.toString())
		}

		while (days[days.length - 1].length < 7)
			days[days.length - 1 ].push('')

		return days
	}, [date])

	/**
	 * define a cor de fundo do dia dependendo das datas especiais
	 * @param day dia
	 * @returns cor de fundo do dia
	 */
	const getBackgroundColor = (day: number) => {
		if (day === date.getDate())
			return COLORS.YELLOW

		if (isToday(day, month, year))
			return COLORS.ORANGE

		if (specialDates?.holidays.includes(day))
			return COLORS.BLUE

		if (specialDates?.celebrations.includes(day))
			return COLORS.PURPLE

		if (specialDates?.others.includes(day))
			return COLORS.PINK

		return '#09090A'
	}

	return (
		<div className="flex gap-4 max-w-6xl w-full p-4 mx-auto">
			<div className="lg:w-[75%] w-full">
				<header className="flex justify-between items-center">
					<div>
						<IconButton icon="angles-left" color="blue" onClick={decrementYear} />
						<IconButton icon="angle-left" color="purple" onClick={decrementMonth} />
					</div>

					<h2 className="capitalize">
						{format(date, 'MMMM yyyy', { locale: ptBR })}
					</h2>

					<div>
						<IconButton icon="angle-right" color="purple" onClick={incrementMonth} />
						<IconButton icon="angles-right" color="blue" onClick={incrementYear} />
					</div>
				</header>

				<table className='w-full mt-8 border-collapse text-lg text-center'>
					<thead>
						<tr>
							{WEEK_DAYS.map((day) =>
								<th className='bg-gray-700 border-2 border-gray-600 p-3' key={day}>{day}</th>
							)}
						</tr>
					</thead>

					<tbody>
						{monthDays.map((week, i) => {
							return (
								<tr key={i}>
									{week.map((day, j) => {
										const num = toNumber(day, 0)

										return (
											<td
												style={{
													cursor: day !== '' ? 'pointer' : 'default',
													background: getBackgroundColor(num),
													color: num === date.getDate() ? '#09090A' : '#E1E1E6'
												}}
												className='border-2 border-gray-700 py-6 font-semibold'
												key={j}
												onClick={() => changeSelectedDate(num)}
											>{day}</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>

				<SpecialDates dates={specialDates?.dates ?? []} />
			</div>

			<MonthEvents month={month} year={year} />
		</div>
	)
}

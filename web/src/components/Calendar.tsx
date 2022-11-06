import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

import { toNumber } from '../utils/convertions'
import { isToday } from '../utils/dates'
import { COLORS } from '../theme'
import { Dates } from '../interfaces/Date'

const WEEK_DAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

/** propriedades do calendário */
interface CalendarProps {
	/** data para exibir os dias do mês */
	date: Date
	/** datas especiais */
	specialDates?: Dates
	/** evento de seleção de data */
	onChangeDate: (newDate: Date) => void
}

/** calendário */
export function Calendar({ date, specialDates, onChangeDate }: CalendarProps) {
	const month = date.getMonth()
	const year = date.getFullYear()

	const navigate = useNavigate()

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

	/**
	 * altera a data selecionada
	 * @param day número do dia selecionado
	 */
	 const changeSelectedDate = (day: number) => {
		if (day > 0) {
			if (day === date.getDate())
				return navigate(`/day_events/${format(date, 'yyyy-MM-dd')}`)

			const d = new Date(year, month, day)
			onChangeDate(d)
		}
	}

	return (
		<>
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
		</>
	)
}

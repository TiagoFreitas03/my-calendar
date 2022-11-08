import { useMemo } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'

import { P } from './Text/P'
import { Row } from './Row'
import { SpecialDates } from '../interfaces/SpecialDate'
import { COLORS } from '../theme'
import { isToday, toNumber } from '../utils'

/** dias da semana */
const WEEK_DAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

/** propriedades do calendário */
interface CalendarProps {
	/** data para exibir os dias do mês */
	date: Date
	/** datas especiais */
	specialDates?: SpecialDates
	/** evento de seleção de data */
	onChangeDate: (newDate: Date) => void
}

/** componente calendário */
export function Calendar({ date, specialDates, onChangeDate }: CalendarProps) {
	const month = date.getMonth()
	const year = date.getFullYear()

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
			return COLORS.YELLOW_500

		if (isToday(day, month, year))
			return COLORS.ORANGE_500

		if (specialDates?.holidays.includes(day))
			return COLORS.BLUE_500

		if (specialDates?.celebrations.includes(day))
			return COLORS.PURPLE_500

		if (specialDates?.others.includes(day))
			return COLORS.PINK_500

		return COLORS.GRAY_900
	}

	/**
	 * altera a data selecionada
	 * @param day número do dia selecionado
	 */
	 const changeSelectedDate = (day: number) => {
		if (day > 0) {
			const d = new Date(year, month, day)
			onChangeDate(d)
		}
	}

	return (
		<View style={{ alignItems: 'center', marginTop: 12 }}>
			<Row>
				{ WEEK_DAYS.map(day => (
					<View style={[styles.th, styles.cell]} key={day}>
						<P centered>{day}</P>
					</View>
				))}
			</Row>

			{ monthDays.map((week, i) => (
				<Row key={i}>
					{ week.map((day, j) => {
						const num = toNumber(day, 0)

						return (
							<Pressable
								onPress={() => changeSelectedDate(num)}
								style={
									[
										styles.td,
										styles.cell,
										{ backgroundColor: getBackgroundColor(num) }
									]
								}
								key={j}
							>
								<P color={COLORS[`GRAY_${num === date.getDate() ? '900' : '100'}`]} centered>
									{ day }
								</P>
							</Pressable>
						)
					}) }
				</Row>
			)) }
		</View>
	)
}

const styles = StyleSheet.create({
	cell: {
		borderWidth: 1,
		width: '13.5%',
	},

	th: {
		backgroundColor: COLORS.GRAY_700,
		borderColor: COLORS.GRAY_600,
		paddingVertical: 12
	},

	td: {
		borderColor: COLORS.GRAY_700,
		paddingVertical: 16,
	}
})

import { useState, useMemo, useEffect } from "react"
import { Text, View , StyleSheet, ScrollView, Pressable } from "react-native"
import { format, add, sub } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { IconButton } from "../components/IconButton"
import { Row } from "../components/Row"
import { SpecialDatesContainer } from "../components/SpecialDatesContainer"

import { COLORS, FONT_FAMILY, FONT_SIZE } from "../theme"
import { isToday, toNumber } from '../utils'
import { SpecialDates } from "../interfaces/SpecialDate"
import { DatesController } from '../controllers/DatesController'

/** dias da semana */
const WEEK_DAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

/** tela inicial */
export function Home() {
	const [date, setDate] = useState(new Date())
	const [specialDates, setSpecialDates] = useState<SpecialDates>()

	const month = date.getMonth()
	const year = date.getFullYear()

	useEffect(() => {
		new DatesController().listByReference({ month: month + 1, year }).then(dates => {
			setSpecialDates(dates)
		})
	}, [month, year])

	/** decrementa o ano em 1 */
	const decreaseYear = () => setDate(sub(date, { years: 1 }))
	/** incrementa o ano em 1 */
	const increaseYear = () => setDate(add(date, { years: 1 }))
	/** decrementa o mês em 1 */
	const decreaseMonth = () => setDate(sub(date, { months: 1 }))
	/** incrementa o mês em 1 */
	const increasetMonth = () => setDate(add(date, { months: 1 }))

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
	 * altera a data selecionada
	 * @param day número do dia selecionado
	 */
	 const changeSelectedDate = (day: number) => {
		if (day > 0) {
			const newDate = new Date(year, month, day)
			setDate(newDate)
		}
	}

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

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Row>
					<IconButton icon="chevrons-left" color="BLUE" onPress={decreaseYear} />
					<IconButton icon="chevron-left" color="PURPLE" onPress={decreaseMonth} />
				</Row>

				<Text style={styles.title}>
					{format(date, 'MMMM yyyy', { locale: ptBR })}
				</Text>

				<Row>
					<IconButton icon="chevron-right" color="PURPLE" onPress={increasetMonth} />
					<IconButton icon="chevrons-right" color="BLUE" onPress={increaseYear} />
				</Row>
			</View>

			<View style={{ alignItems: 'center', marginTop: 12 }}>
				<Row>
					{ WEEK_DAYS.map(day => (
						<Text style={[styles.th, styles.cell, styles.text]} key={day}>{day}</Text>
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
									<Text style={[
										styles.text,
										{ color: COLORS[num === date.getDate() ? 'GRAY_900' : 'GRAY_100'] }
									]}>{ day }</Text>
								</Pressable>
							)
						}) }
					</Row>
				)) }
			</View>

			<SpecialDatesContainer dates={specialDates?.dates ?? []} />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		flex: 1,
		backgroundColor: '#09090A',
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 16,
		paddingHorizontal: 12
	},

	title: {
		color: COLORS.GRAY_100,
		fontSize: FONT_SIZE.MD,
		fontFamily: FONT_FAMILY.REGULAR,
		textTransform: 'capitalize'
	},

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
	},

	text: {
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.SM,
		color: COLORS.GRAY_100,
		textAlign: 'center'
	}
})

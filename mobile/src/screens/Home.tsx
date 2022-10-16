import { useState, useMemo } from "react"
import { Text, View , StyleSheet, Dimensions } from "react-native"
import { format, add, sub } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Header } from '../components/Header'
import { IconButton } from "../components/IconButton"
import { Row } from "../components/Row"
import { COLORS, FONT_FAMILY, FONT_SIZE } from "../theme"

/** dias da semana */
const WEEK_DAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

/** tela inicial */
export function Home() {
	const [date, setDate] = useState(new Date())

	const month = date.getMonth()
	const year = date.getFullYear()

	/** decrementa o ano em 1 */
	const decrementYear = () => setDate(sub(date, { years: 1 }))

	/** incrementa o ano em 1 */
	const incrementYear = () => setDate(add(date, { years: 1 }))

	/** decrementa o mês em 1 */
	const decrementMonth = () => setDate(sub(date, { months: 1 }))

	/** incrementa o mês em 1 */
	const incrementMonth = () => setDate(add(date, { months: 1 }))

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

	return (
		<View style={styles.container}>
			<Header />

			<View style={styles.header}>
				<Row>
					<IconButton icon="chevrons-left" color="BLUE" onPress={decrementYear} />
					<IconButton icon="chevron-left" color="PURPLE" onPress={decrementMonth} />
				</Row>

				<Text style={styles.title}>
					{format(date, 'MMMM yyyy', { locale: ptBR })}
				</Text>

				<Row>
					<IconButton icon="chevron-right" color="PURPLE" onPress={incrementMonth} />
					<IconButton icon="chevrons-right" color="BLUE" onPress={incrementYear} />
				</Row>
			</View>

			<View style={{ alignItems: 'center', marginTop: 12 }}>
				<Row>
					{ WEEK_DAYS.map(day => <Text style={[styles.th, styles.cell]} key={day}>{day}</Text>)}
				</Row>

				{ monthDays.map((week, i) => (
					<Row key={i}>
						{ week.map((day, j) => <Text style={[styles.td, styles.cell]} key={j}>{day}</Text>) }
					</Row>
				)) }
			</View>
		</View>
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
		width: Dimensions.get('window').width / 7.5,
		textAlign: 'center',
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.SM,
	},

	th: {
		backgroundColor: COLORS.GRAY_700,
		borderColor: COLORS.GRAY_600,
		color: COLORS.GRAY_100,
		paddingVertical: 12
	},

	td: {
		color: COLORS.GRAY_100,
		borderColor: COLORS.GRAY_700,
		paddingVertical: 16,
	}
})

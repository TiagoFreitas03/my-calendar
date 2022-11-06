import { useState, useEffect } from "react"
import { Text, View , StyleSheet, ScrollView } from "react-native"
import { format, add, sub } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { IconButton } from "../components/IconButton"
import { Row } from "../components/Row"
import { SpecialDatesContainer } from "../components/SpecialDatesContainer"

import { COLORS, FONT_FAMILY, FONT_SIZE } from "../theme"
import { SpecialDates } from "../interfaces/SpecialDate"
import { DatesController } from '../controllers/DatesController'
import { Calendar } from "../components/Calendar"

type ChangeDateOperations = 'DY' | 'DM' | 'IY' | 'IM'

/** tela inicial */
export function Home() {
	const [date, setDate] = useState(new Date())
	const [specialDates, setSpecialDates] = useState<SpecialDates>()

	const month = date.getMonth()
	const year = date.getFullYear()

	useEffect(() => { getSpecialDates(month + 1, year) }, [])

	/**
	 * busca as datas especiais por referência (mes e ano)
	 * @param m mês
	 * @param y ano
	 */
	async function getSpecialDates(m: number, y: number) {
		const dates = await new DatesController().listByReference({ month: m, year: y })
		setSpecialDates(dates)
	}

	/** trata a mudança de mês/ano */
	async function handleChangeDate(operation: ChangeDateOperations) {
		let newDate: Date

		switch (operation) {
			case 'DY': newDate = sub(date, { years: 1 }); break;
			case 'DM': newDate = sub(date, { months: 1 }); break;
			case 'IY': newDate = add(date, { years: 1 }); break;
			case 'IM': newDate = add(date, { months: 1 }); break;
		}

		await getSpecialDates(newDate.getMonth() + 1, newDate.getFullYear())
		setDate(newDate)
	}

	/** decrementa o ano em 1 */
	const decreaseYear = () => handleChangeDate('DY')
	/** incrementa o ano em 1 */
	const increaseYear = () => handleChangeDate('IY')
	/** decrementa o mês em 1 */
	const decreaseMonth = () => handleChangeDate('DM')
	/** incrementa o mês em 1 */
	const increaseMonth = () => handleChangeDate('IM')


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
					<IconButton icon="chevron-right" color="PURPLE" onPress={increaseMonth} />
					<IconButton icon="chevrons-right" color="BLUE" onPress={increaseYear} />
				</Row>
			</View>

			<Calendar date={date} specialDates={specialDates} onChangeDate={d => setDate(d)} />

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
		fontSize: FONT_SIZE.LG,
		fontFamily: FONT_FAMILY.REGULAR,
		textTransform: 'capitalize'
	},
})

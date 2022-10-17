import { StyleSheet, Text, View } from "react-native"

import { SpecialDate } from "../interfaces/SpecialDate"
import { COLORS, FONT_FAMILY, FONT_SIZE } from "../theme"
import { Subtitle } from "./Subtitle"

/** propriedades do container de datas especiais */
interface SpecialDatesContainerProps {
	/** datas especiais */
	dates: SpecialDate[]
}

/** container de datas especiais */
export function SpecialDatesContainer({ dates }: SpecialDatesContainerProps) {
	return (
		<View style={styles.container}>
			<View>
				<Subtitle color='BLUE' text='Feriado' />
				<Subtitle color='PURPLE' text='Data Comemorativa' />
				<Subtitle color='PINK' text='Ponto Facultativo' />
				<Subtitle color='ORANGE' text='Hoje' />
				<Subtitle color='YELLOW' text='Selecionado' />
			</View>

			<View style={styles.datesContainer}>
				<Text style={styles.title}>Feriados e Datas Comemorativas</Text>

				{
					dates.length > 0 ?
						dates.map((date, i) => (
							<View key={i} style={styles.specialDate}>
								<View
									style={
										[
											styles.dayContainer,
											{
												backgroundColor: date.type === 'FN' ? COLORS.BLUE_500 :
													date.type === 'DC' ? COLORS.PURPLE_500 : COLORS.PINK_500
											}
										]
									}
								>
									<Text style={styles.day}>{date.day}</Text>
								</View>

								<Text style={styles.text}>{date.name}</Text>
							</View>
						)) :
						<Text style={styles.text}>Nenhum feriado ou data comemorativa este mês.</Text>
				}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 24
	},

	datesContainer: {
		backgroundColor: COLORS.GRAY_700,
		borderRadius: 8,
		padding: 20,
		marginTop: 16
	},

	title: {
		fontSize: FONT_SIZE.MD,
		fontFamily: FONT_FAMILY.BOLD,
		color: COLORS.GRAY_100,
		marginBottom: 16
	},

	specialDate: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8
	},

	dayContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		width: 32,
		height: 32,
		borderRadius: 4,
		marginRight: 8,
	},

	day: {
		color: COLORS.GRAY_100,
		textAlign: 'center'
	},

	text: {
		color: COLORS.GRAY_100,
		fontSize: FONT_SIZE.SM,
		fontFamily: FONT_FAMILY.REGULAR
	}
})

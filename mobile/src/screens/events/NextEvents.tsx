import { useEffect, useState } from "react"
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import { useNavigation } from '@react-navigation/native'

import { Background } from "../../components/Background"
import { Input } from "../../components/Input"
import { Pagination } from "../../components/Pagination"
import { EventsController } from "../../controllers/EventsController"
import { Event } from "../../interfaces/Event"
import { COLORS, FONT_FAMILY, FONT_SIZE } from "../../theme"

/** tela de pesquisa dos próximos eventos */
export function NextEvents() {
	const [name, setName] = useState('')
	const [page, setPage] = useState(1)
	const [events, setEvents] = useState<Event[]>([])
	const [totalPages, setTotalPages] = useState(1)

	const navigation = useNavigation()

	useEffect(() => {
		new EventsController().searchByName(name, page, 10).then(data => {
			setEvents(data.events)
			setTotalPages(data.pages)
		})
	}, [name, page])

	return (
		<Background>
			<View style={styles.container}>
				<Input label="Pesquise pelo nome do evento:" value={name} onChangeText={setName} />

				<View style={{ width: Dimensions.get('window').width - 40 }}>
					{
						events.length > 0 ? (
							<Pagination current={page} total={totalPages} onChange={pg => setPage(pg)}>
								{
									events.map(event => (
										<Pressable
											key={event.id}
											onPress={() => navigation.navigate('event_details', { id: event.id })}
											style={styles.eventCard}
										>
											<Text style={styles.text}>{event.name}</Text>
											<Text style={styles.date}>{event.start}</Text>
										</Pressable>
									))
								}
							</Pagination>
						) : (
							<Text style={styles.text}>Nenhum compromisso/evento encontrado.</Text>
						)
					}
				</View>
			</View>
		</Background>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 12,
		alignItems: 'center'
	},

	text: {
		color: COLORS.GRAY_100,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.MD
	},

	eventCard: {
		borderWidth: 1,
		borderRadius: 12,
		borderColor: COLORS.GRAY_500,
		paddingVertical: 24,
		paddingHorizontal: 16,
		marginVertical: 6,
	},

	date: {
		color: COLORS.GRAY_300,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.SM,
		marginTop: 8
	},
})

import { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import type { DrawerScreenProps } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/Feather'

import { RootStackParamList } from '../../routes/index.routes'
import { Background } from "../../components/Background"
import { Event } from '../../interfaces/Event'
import { EventsController } from '../../controllers/EventsController'
import { COLORS, FONT_FAMILY, FONT_SIZE } from '../../theme'
import { Row } from '../../components/Row'

/** propriedades da tela de cadastro/edição de evento */
type EventDetailsProps = DrawerScreenProps<RootStackParamList, 'event_details'>

/** tela de detalhe do evento */
export function EventDetails({ route }: EventDetailsProps) {
	const id = route.params.id
	const navigation = useNavigation()

	const [event, setEvent] = useState<Event>()

	useEffect(() => {
		new EventsController().findById(id).then(data => setEvent(data))
	}, [id])

	/** trata o evento de pressionamento do botão de exclusão do evento */
	async function handleDeleteEvent() {
		try {
			const message = await new EventsController().delete(id)

			Alert.alert('Tudo certo!', message)

			navigation.navigate('home')
		} catch (err: any) {
			const { message } = err.response.data

			Alert.alert('Ocorreu um erro!', message)
		}
	}

	return (
		<Background>
			<View style={styles.container}>
				{
					event ? (
						<>
							<Text style={styles.title}>{event.name}</Text>

							{ event.description && <Text style={styles.text}>{event.description}</Text> }

							<Text style={styles.text}>Início: {event.start}</Text>

							{ event.end && <Text style={styles.text}>Fim: {event.end}</Text> }

							<Row>
								<Pressable
									style={[styles.button, { borderColor: COLORS.PURPLE_500 }]}
									onPress={() => navigation.navigate('update_event', { id: event.id })}
								>
									<Icon name='edit' color={COLORS.GRAY_100} size={24} />
								</Pressable>

								<Pressable
									style={[styles.button, { borderColor: COLORS.PINK_500 }]}
									onPress={handleDeleteEvent}
								>
									<Icon name='trash' color={COLORS.GRAY_100} size={24} />
								</Pressable>
							</Row>
						</>
					) : (
						<Text>Evento não encontrado.</Text>
					)
				}
			</View>
		</Background>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},

	title: {
		color: COLORS.GRAY_100,
		fontSize: 24,
		fontFamily: FONT_FAMILY.BOLD
	},

	text: {
		color: COLORS.GRAY_100,
		fontSize: FONT_SIZE.MD,
		fontFamily: FONT_FAMILY.REGULAR,
		marginVertical: 16
	},

	button: {
		borderWidth: 2,
		borderRadius: 8,
		padding: 8,
		marginRight: 8
	}
})

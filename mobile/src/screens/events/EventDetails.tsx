import { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import type { DrawerScreenProps } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/Feather'

import { StackParamList } from '../../stacks/StackParamList'
import { Event } from '../../interfaces/Event'
import { EventsController } from '../../controllers/EventsController'
import { COLORS } from '../../theme'
import { Background } from "../../components/Background"
import { Row } from '../../components/Row'
import { Title } from '../../components/Text/Title'
import { P } from '../../components/Text/P'

/** propriedades da tela de cadastro/edição de evento */
type EventDetailsProps = DrawerScreenProps<StackParamList, 'event_details'>

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
							<Title size={24}>{event.name}</Title>

							{ event.description && <P mv={16}>{event.description}</P> }

							<P mv={16}>Início: {event.start}</P>

							{ event.end && <P mv={16}>Fim: {event.end}</P> }

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
						<P>Evento não encontrado.</P>
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

	button: {
		borderWidth: 2,
		borderRadius: 8,
		padding: 8,
		marginRight: 8
	}
})

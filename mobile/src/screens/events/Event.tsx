import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert } from "react-native"
import { useNavigation } from '@react-navigation/native'
import type { DrawerScreenProps } from '@react-navigation/drawer'
import { format } from 'date-fns'

import { DrawerStackParamList } from '../../routes/drawer.routes'
import { COLORS, FONT_FAMILY, FONT_SIZE } from "../../theme"
import { EventsController } from '../../controllers/EventsController'
import { Label } from '../../interfaces/Label'
import { Background } from "../../components/Background"
import { Input } from "../../components/Input"
import { MaskInput } from '../../components/MaskInput'
import { LabelsControl } from '../../components/LabelsControl'
import { Button } from '../../components/Button'

/** propriedades da tela de cadastro/edição de evento */
type EventProps = DrawerScreenProps<DrawerStackParamList, 'event'>

/** mensagens de erro no cadastro/edição de evento */
interface CreateEventError {
	name?: string
	start?: string
	end?: string
}

/** tipo para campos opcionais */
type Optional = string | undefined

/** página de cadastro/edição de evento */
export function Event({ route }: EventProps) {
	const id = route.params?.id
	const navigation = useNavigation()

	const [name, setName] = useState('')
	const [description, setDescription] = useState<Optional>('')
	const [start, setStart] = useState(format(new Date, 'dd/MM/yyyy'))
	const [startTime, setStartTime] = useState(format(new Date, 'HH:mm'))
	const [end, setEnd] = useState<Optional>('')
	const [endTime, setEndTime] = useState<Optional>('')
	const [labels, setLabels] = useState<Label[]>([])
	const [error, setError] = useState<CreateEventError>()

	useEffect(() => {
		if (id) {
			new EventsController().findById(id).then(data => {
				setName(data.name)
				setDescription(data.description)
				setStart(data.startDate)
				setStartTime(data.startTime)
				setEnd(data.endDate)
				setEndTime(data.endTime)

				if (data.labels)
					setLabels(data.labels)
			})
		}
	}, [id])

	/** trata o cadastro de evento */
	async function handleCreateOrEditEvent() {
		try {
			const data = {
				name,
				description,
				start: `${start.split('/').reverse().join('-')} ${startTime}`,
				end: end ? `${end.split('/').reverse().join('-')} ${endTime}` : undefined,
				labels_ids: labels.map(label => label.id)
			}

			let message = '', event_id = id
			const controller = new EventsController()

			if (!id) {
				const result = await controller.create(data)
				event_id = result.event
				message = result.message
			} else
				message = await controller.edit(data, id)

			Alert.alert('Tudo certo!', message)

			navigation.navigate('home')
		} catch (err: any) {
			const { message, errors } = err.response.data

			if (errors)
				setError(errors)
			else
				setError(undefined)

			Alert.alert('Ocorreu um erro!', message)
		}
	}

	return (
		<Background>
			<View style={styles.container}>
				<Text style={styles.title}>Novo Evento</Text>

				<Input label="Nome" value={name} error={error?.name} onChangeText={setName} />

				<Input label='Descrição' value={description} onChangeText={setDescription} numberOfLines={4} />

				<View style={styles.box}>
					<MaskInput label='Início' mask='date' value={start} onType={value => setStart(value)} />

					<MaskInput mask='time' value={startTime} onType={v => setStartTime(v)} error={error?.start} />
				</View>

				<View style={styles.box}>
					<MaskInput label='Fim' mask='date' value={end} onType={value => setEnd(value)} />

					<MaskInput mask='time' value={endTime} onType={v => setEndTime(v)} error={error?.end} />
				</View>

				<LabelsControl onChange={l => setLabels(l)} />

				<Button title='Cadastrar' onPress={handleCreateOrEditEvent} />
			</View>
		</Background>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 24,
		justifyContent: 'center',
		alignItems: 'center'
	},

	title: {
		color: COLORS.GRAY_100,
		fontFamily: FONT_FAMILY.BOLD,
		fontSize: FONT_SIZE.LG
	},

	box: {
		borderWidth: 2,
		borderColor: COLORS.GRAY_500,
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginVertical: 12
	}
})

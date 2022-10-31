import { useState } from 'react'
import { Alert, Text, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { LabelsController } from '../controllers/LabelsController'
import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'
import { isValidHexCode } from '../utils'

import { Input } from '../components/Input'
import { Background } from '../components/Background'
import { MaskInput } from '../components/MaskInput'
import { Button } from '../components/Button'

/** mensagens de erro para os campos de cadastro de label */
interface CreateLabelError {
	name?: string
	color?: string
}

/** página para cadastro de label */
export function CreateLabel() {
	const navigation = useNavigation()

	const [name, setName] = useState('')
	const [color, setColor] = useState('#000000')
	const [error, setError] = useState<CreateLabelError>()

	/** trata o cadastro de label */
	async function handleCreateLabel() {
		try {
			const { message } = await new LabelsController().create(name, color)

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
				<Text style={styles.title}>Nova Etiqueta</Text>

				<Input label='Nome' value={name} onChangeText={setName} error={error?.name} />

				<MaskInput
					value={color}
					mask='hex'
					onType={value => setColor(value)}
					label='Cor'
					error={error?.color}
				/>

				<Text style={styles.text}>Preview:</Text>

				<View
					style={
						[
							styles.preview,
							{ backgroundColor: isValidHexCode(color) ? color : '#000000' }
						]
					}
				/>

				<Button title='Criar' onPress={handleCreateLabel} />
			</View>
		</Background>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 16,
		alignItems: 'center'
	},

	title: {
		color: COLORS.GRAY_100,
		fontFamily: FONT_FAMILY.BOLD,
		fontSize: FONT_SIZE.LG
	},

	text: {
		color: COLORS.GRAY_100,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.SM,
		marginTop: 12
	},

	preview: {
		borderWidth: 4,
		borderColor: COLORS.GRAY_100,
		padding: 20,
		width: '85%',
		marginVertical: 12,
	}
})

import { useState } from 'react'
import { Text, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { COLORS, FONT_FAMILY } from '../../theme'
import { Background } from '../../components/Background'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { ImageInput } from '../../components/ImageInput'
import { MaskInput } from '../../components/MaskInput'
import { UsersController } from '../../controllers/UsersController'

/** erros dos campos de cadastro de usuário */
interface CreateUserError {
	name?: string
	email?: string
	password?: string
	picture?: string
	birth_date?: string
}

/** tela de cadastro de usuário */
export function Register() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [birthDate, setBirthDate] = useState('')
	const [picture, setPicture] = useState('')
	const [errors, setErrors] = useState<CreateUserError>()

	const navigation = useNavigation()

	async function handleRegister() {
		try {
			const data = { name, email, password, birth_date: birthDate, picture }

			const message = await new UsersController().create(data)

			Alert.alert(message)
			setErrors({})
			navigation.navigate('login')
		} catch (err: any) {
			const { errors, message } = err.response.data

			if (errors)
				setErrors(errors)

			Alert.alert(message)
		}
	}

	return (
		<Background center>
			<Text style={styles.text}>Cadastre-se</Text>

			<Input label='Nome' onChangeText={setName} error={errors?.name}	/>

			<Input
				label='E-mail'
				keyboardType='email-address'
				onChangeText={setEmail}
				error={errors?.email}
			/>

			<Input
				label='Senha'
				secureTextEntry
				onChangeText={setPassword}
				error={errors?.password}
			/>

			<MaskInput
				mask='date'
				label='Data de Nascimento'
				onType={value => setBirthDate(value)}
				value={birthDate}
				error={errors?.birth_date}
			/>

			<ImageInput
				label='Foto'
				filename={picture}
				onSelect={(image) => setPicture(image)}
				onClear={() => setPicture('')}
			/>

			<Button title='Cadastrar' onPress={handleRegister} />
		</Background>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	text: {
		color: COLORS.GRAY_100,
		fontFamily: FONT_FAMILY.BOLD,
		fontSize: 24,
		marginBottom: 12,
		textAlign: 'center'
	},
})

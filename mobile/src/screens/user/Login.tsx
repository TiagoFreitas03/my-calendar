import { useState } from 'react'
import { Text, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Background } from '../../components/Background'
import { COLORS, FONT_FAMILY } from '../../theme'
import { UsersController } from '../../controllers/UsersController'
import { useAuth } from '../../contexts/AuthContext'

/** tela de login */
export function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigation = useNavigation()
	const { signIn } = useAuth()

	async function handleLogin() {
		try {
			const { token } = await new UsersController().login(email, password)
			signIn(token)
			navigation.navigate('home')
		} catch (err: any) {
			const { message } = err.response.data
			Alert.alert(message)
		}
	}

	return (
		<Background center>
			<Text style={styles.text}>Faça login para continuar</Text>

			<Input label='E-mail' keyboardType='email-address' onChangeText={setEmail} />

			<Input label='Senha' secureTextEntry onChangeText={setPassword} />

			<Button title='Entrar' onPress={handleLogin} />
		</Background>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		//height: Dimensions.get('window').height
	},

	text: {
		color: COLORS.GRAY_100,
		fontFamily: FONT_FAMILY.BOLD,
		fontSize: 24,
		marginBottom: 20,
		textAlign: 'center'
	}
})

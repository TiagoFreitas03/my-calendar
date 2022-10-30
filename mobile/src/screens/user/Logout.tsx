import { useEffect } from 'react'
import { StyleSheet, Text } from "react-native"
import { useNavigation } from '@react-navigation/native'

import { Background } from "../../components/Background"
import { useAuth } from '../../contexts/AuthContext'
import { COLORS, FONT_FAMILY, FONT_SIZE } from "../../theme"

export function Logout() {
	const { signOut } = useAuth()

	const navigation = useNavigation()

	useEffect(() => {
		setTimeout(() => {
			signOut()
			navigation.navigate('home')
		}, 2000)
	}, [])

	return (
		<Background center>
			<Text style={styles.text}>
				Você será redirecionadx para a tela inicial em instantes
			</Text>
		</Background>
	)
}

const styles = StyleSheet.create({
	text: {
		color: COLORS.GRAY_100,
		fontSize: FONT_SIZE.LG,
		fontFamily: FONT_FAMILY.REGULAR,
		textAlign: 'center',
		paddingHorizontal: 24
	}
})

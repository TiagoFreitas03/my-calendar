import { Pressable, Text } from "react-native"
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/Feather'

import { Row } from "../Row"
import { COLORS, FONT_FAMILY, FONT_SIZE } from '../../theme'
import { useAuth } from "../../contexts/AuthContext"

/** nomes das telas para se navegar */
type Screens = 'home' | 'login' | 'register' | 'create_event' | 'next_events' | 'logout'

/** propriedades do item do menu */
interface ItemProps {
	/** título */
	title: string
	/** ícone */
	icon: any
	/** tela para qual o item leva */
	screen: Screens
}

/** item do menu lateral */
export function Item({ title, icon, screen }: ItemProps) {
	const { signOut } = useAuth()

	const navigation = useNavigation()

	return (
		<Pressable
			onPress={async() => {
				if (screen === 'logout') {
					await signOut()
					navigation.navigate('home')
					return
				}

				navigation.navigate(screen)
			}}
			style={{
				borderWidth: 1,
				borderColor: COLORS.GRAY_100,
				borderRadius: 12,
				padding: 12,
				margin: 8
			}}
		>
			<Row>
				<Icon name={icon} size={18} color='white' />

				<Text
					style={{
						color: COLORS.GRAY_100,
						fontFamily: FONT_FAMILY.REGULAR,
						fontSize: FONT_SIZE.MD,
						marginLeft: 8,
					}}
				>
					{title}
				</Text>
			</Row>
		</Pressable>
	)
}

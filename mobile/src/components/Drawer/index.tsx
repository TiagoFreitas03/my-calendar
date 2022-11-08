import { View, StyleSheet } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'

import { COLORS } from '../../theme'
import { useAuth } from '../../contexts/AuthContext'
import { Title } from '../Text/Title'
import { P } from '../Text/P'
import { Item } from './Item'

/** menu lateral */
export function Drawer() {
	const { signed } = useAuth()

	return (
		<View style={styles.container}>
			<View style={styles.subcontainer}>
				<Title>Bem-vindx ao MyCalendar</Title>
			</View>

			<DrawerContentScrollView contentContainerStyle={styles.menu}>
				<Item title='Início' icon='home' screen='home' />
				{
					!signed ? (
						<>
							<Item title='Login' icon='log-in' screen='login' />
							<Item title='Cadastre-se' icon='user' screen='register' />
						</>
					) : (
						<>
							<Item title='Criar evento' icon='plus' screen='create_event' />
							<Item title='Próximos eventos' icon='calendar' screen='next_events' />
							<Item title='Sair' icon='log-out' screen='logout' />
						</>
					)
				}

			</DrawerContentScrollView>

			<View style={styles.subcontainer}>
				<P>&copy; 2022 MyCalendar</P>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.GRAY_700,
		paddingVertical: 12,
		paddingHorizontal: 8,
		borderLeftWidth: 1,
		borderColor: COLORS.GRAY_600,
		flexDirection: 'column',
		justifyContent: 'space-between'
	},

	menu: {
		flex: 1,
		justifyContent: 'center',
	},

	subcontainer: {
		paddingHorizontal: 2,
		paddingVertical: 24,
		alignItems: 'center'
	}
})

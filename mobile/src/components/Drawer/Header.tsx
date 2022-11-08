import { View, StyleSheet, Image, Pressable } from 'react-native'
import { DrawerHeaderProps } from '@react-navigation/drawer'
import Icon from '@expo/vector-icons/FontAwesome5'

import { logo } from '../../assets'
import { COLORS } from '../../theme'
import { Title } from '../Text/Title'

/** cabeçalho do drawer */
export function Header({ navigation }: DrawerHeaderProps) {
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Image source={logo} style={styles.image} />

				<Title>MyCalendar</Title>
			</View>

			<Pressable onPress={() => navigation.openDrawer()}>
				<Icon name='bars' size={30} color={COLORS.GRAY_100} />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.GRAY_700,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 20,
		borderBottomWidth: 2,
		borderColor: COLORS.GRAY_600
	},

	image: {
		width: 40,
		height: 31.5,
		marginRight: 12
	}
})

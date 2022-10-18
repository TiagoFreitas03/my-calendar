import { StyleSheet, View, Image, Text, Pressable } from 'react-native'
import { DrawerHeaderProps } from '@react-navigation/drawer'
import Icon from '@expo/vector-icons/Ionicons'

import { logo } from '../assets'
import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'

/** cabeçalho da aplicação */
export function Header({ navigation }: DrawerHeaderProps) {
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Image source={logo} style={styles.image} />

				<Text style={styles.title}>MyCalendar</Text>
			</View>

			<Pressable onPress={() => navigation.openDrawer()}>
				<Icon name='menu' size={30} color={COLORS.GRAY_100} />
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
		height: 31.5
	},

	title: {
		color: COLORS.GRAY_100,
		fontSize: FONT_SIZE.LG,
		marginLeft: 12,
		fontFamily: FONT_FAMILY.BOLD
	}
})

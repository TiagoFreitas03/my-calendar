import { StyleSheet, View, Text } from 'react-native'
import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItemList
} from '@react-navigation/drawer'

import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'

/** menu lateral */
export function Drawer(props: DrawerContentComponentProps) {
	return (
		<View style={styles.container}>
			<Text style={[styles.header, styles.text]}>Bem-vindx ao MyCalendar</Text>

			<DrawerContentScrollView {...props} contentContainerStyle={styles.menu} style={{}}>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>

			<Text style={[styles.footer, styles.text]}>&copy; 2022 MyCalendar</Text>
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

	text: {
		paddingHorizontal: 8,
		paddingVertical: 16,
		color: COLORS.GRAY_100,
		textAlign: 'center'
	},

	header: {
		fontSize: FONT_SIZE.MD,
		fontFamily: FONT_FAMILY.BOLD,
	},

	footer: {
		fontSize: FONT_SIZE.SM,
		fontFamily: FONT_FAMILY.REGULAR,
	}
})

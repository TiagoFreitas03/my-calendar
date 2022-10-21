import { StyleSheet, Text } from "react-native"

import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'

/** propriedades da label */
interface LabelProps {
	/** título */
	title: string
}

export function Label({ title }: LabelProps) {
	return (
		<Text style={styles.label}>
			{ title }
		</Text>
	)
}

const styles = StyleSheet.create({
	label: {
		color: COLORS.GRAY_100,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.MD,
		paddingBottom: 8,
	},
})

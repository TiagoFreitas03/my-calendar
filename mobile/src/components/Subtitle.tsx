import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '../theme'

/** propriedades da legenda */
interface SubtitleProps {
	/** cor de fundo */
	color: 'BLUE' | 'PURPLE' | 'PINK' | 'ORANGE' | 'YELLOW'

	/** texto */
	text: string
}

/** legenda para o container de datas especiais */
export function Subtitle({ color, text }: SubtitleProps) {
	return (
		<View style={styles.container}>
			<View
				style={[
					styles.square,
					{ backgroundColor: COLORS[`${color}_500`] }
				]}
			/>
			<Text style={styles.text}>{ text }</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8
	},

	text: {
		color: COLORS.GRAY_100,
		marginLeft: 8
	},

	square: {
		width: 20,
		height: 20,
		borderRadius: 4,
	}
})

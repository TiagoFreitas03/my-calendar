import {
	TouchableOpacity,
	TouchableOpacityProps,
	Text,
	StyleSheet,
	Dimensions
} from "react-native"

import { COLORS, FONT_FAMILY, FONT_SIZE } from "../theme"

/** propriedades do botão */
interface ButtonProps extends TouchableOpacityProps {
	/** texto */
	title: string
}

/** botão padrão da aplicação */
export function Button({ title, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity style={styles.button} activeOpacity={0.75} {...rest}>
			<Text style={styles.text}>
				{ title }
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.BLUE_500,
		paddingVertical: 12,
		borderRadius: 8,
		width: Dimensions.get('window').width - 50,
		marginVertical: 16
	},

	text: {
		fontSize: FONT_SIZE.LG,
		fontFamily: FONT_FAMILY.REGULAR,
		color: COLORS.GRAY_100,
		textAlign: 'center'
	}
})

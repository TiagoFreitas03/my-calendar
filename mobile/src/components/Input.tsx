import { TextInputProps, View, TextInput, Text, StyleSheet, Dimensions } from "react-native"

import { COLORS, FONT_FAMILY, FONT_SIZE } from "../theme"

/** propriedades do input */
interface InputProps extends TextInputProps {
	/** título do input */
	label?: string

	/** mensagem do erro de validação */
	error?: string
}

/** input padrão da aplicação */
export function Input({ label, error, ...rest }: InputProps) {
	return (
		<View style={styles.container}>
			{
				label &&
				<Text style={styles.label}>
					{ label }
					{ error && <Text>{error}</Text> }
				</Text>
			}

			<TextInput
				{...rest}
				selectionColor={COLORS.GRAY_300}
				style={styles.input}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 12,
	},

	label: {
		color: COLORS.GRAY_100,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.MD,
		paddingBottom: 8,
	},

	input: {
		backgroundColor: COLORS.GRAY_100,
		borderWidth: 1,
		borderColor: COLORS.GRAY_600,
		borderRadius: 8,
		padding: 12,
		color: COLORS.GRAY_900,
		width: Dimensions.get('window').width - 50,
	}
})

import { TextInputProps, View, TextInput, Text, StyleSheet, Dimensions } from "react-native"

import { Label } from './Label'
import { COLORS, FONT_FAMILY, FONT_SIZE } from "../theme"

/** propriedades do input */
export interface InputProps extends TextInputProps {
	/** título do input */
	label?: string

	/** mensagem do erro de validação */
	error?: string
}

/** input padrão da aplicação */
export function Input({ label, error, ...rest }: InputProps) {
	return (
		<View style={styles.container}>
			<View style={styles.labelContainer}>
				{
					label && <>
						<Label title={label} />
						{ error && <Text style={styles.error}>{ error }*</Text> }
					</>
				}
			</View>

			<TextInput
				{...rest}
				selectionColor={COLORS.GRAY_300}
				style={styles.input}
				multiline={(rest.numberOfLines && rest.numberOfLines > 1) ? true : false}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 12,
	},

	labelContainer: {
		flexDirection: 'row',
		alignItems: 'baseline'
	},

	input: {
		backgroundColor: COLORS.GRAY_100,
		borderWidth: 1,
		borderColor: COLORS.GRAY_600,
		borderRadius: 8,
		padding: 12,
		color: COLORS.GRAY_900,
		width: Dimensions.get('window').width - 50,
	},

	error: {
		color: COLORS.PINK_500,
		marginLeft: 12,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.SM
	}
})

import { Pressable, StyleSheet, Text, View } from "react-native"

import { Label } from "../interfaces/Label"
import { COLORS, FONT_FAMILY, FONT_SIZE } from "../theme"

/** propriedades do container de labels */
interface LabelsProps {
	/** vetor de labels */
	data: Label[]

	/** indica se o botão de remoção deve ser exibido */
	showRemoveButton?: boolean

	/** evento de remoção da label */
	onRemove?: (id: number) => void
}

/** container para as etiquetas dos eventos */
export function Labels({ data, showRemoveButton, onRemove }: LabelsProps) {
	return (
		<View style={styles.container}>
			{
				data.map(label => (
					<Text key={label.id} style={[styles.label, { borderColor: label.color }]}>
						{label.name}

						{
							showRemoveButton &&
							<Pressable
								onPress={() => {
									if (onRemove)
										onRemove(label.id)
								}}
							>
								<Text style={styles.removeButtonText}>&times;</Text>
							</Pressable>
						}
					</Text>
				))
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},

	label: {
		borderWidth: 2,
		color: COLORS.GRAY_100,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.MD,
		paddingLeft: 16,
		paddingRight: 8,
		paddingVertical: 8,
		borderRadius: 16,
		marginRight: 8,
	},

	removeButtonText: {
		marginLeft: 8,
		color: COLORS.GRAY_300,
		fontSize: FONT_SIZE.MD,
		fontFamily: FONT_FAMILY.REGULAR
	}
})

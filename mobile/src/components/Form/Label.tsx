import { Text } from "react-native"

import { COLORS, FONT_FAMILY, FONT_SIZE } from '../../theme'

/** propriedades da label */
interface LabelProps {
	/** título */
	title: string
}

/** label do input */
export function Label({ title }: LabelProps) {
	return (
		<Text
			style={{
				color: COLORS.GRAY_100,
				fontFamily: FONT_FAMILY.REGULAR,
				fontSize: FONT_SIZE.MD,
				paddingBottom: 8,
			}}
		>
			{ title }
		</Text>
	)
}

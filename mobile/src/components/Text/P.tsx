import { Text } from "react-native"

import { BaseProps } from "../../interfaces/BaseProps"
import { COLORS, FONT_FAMILY, FONT_SIZE } from "../../theme"

/** parágrafo (texto com estilo padrão) */
export function P({ children }: BaseProps) {
	return (
		<Text
			style={{
				color: COLORS.GRAY_100,
				fontSize: FONT_SIZE.SM,
				fontFamily: FONT_FAMILY.REGULAR
			}}
		>
			{ children }
		</Text>
	)
}

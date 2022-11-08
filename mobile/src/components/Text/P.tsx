import { Text } from "react-native"

import { BaseProps } from "../../interfaces/BaseProps"
import { COLORS, FONT_FAMILY, FONT_SIZE } from "../../theme"

/** propriedades do parágrafo */
interface ParagraphProps extends BaseProps {
	/** indica se o texto deve ser centralizado */
	centered?: boolean
	/** cor do texto */
	color?: string
}

/** parágrafo (texto com estilo padrão) */
export function P({ children, centered, color = COLORS.GRAY_100 }: ParagraphProps) {
	return (
		<Text
			style={{
				color,
				fontSize: FONT_SIZE.SM,
				fontFamily: FONT_FAMILY.REGULAR,
				textAlign: centered ? 'center' : 'left',
			}}
		>
			{ children }
		</Text>
	)
}

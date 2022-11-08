import { Text } from "react-native"
import { BaseProps } from "../../interfaces/BaseProps"

import { COLORS, FONT_FAMILY, FONT_SIZE } from '../../theme'

/** propriedades do título */
interface TitleProps extends BaseProps {
	size?: number
}

/** componente título com estilização predefinida */
export function Title({ children, size }: TitleProps) {
	return (
		<Text
			style={{
				color: COLORS.GRAY_100,
				fontFamily: FONT_FAMILY.BOLD,
				fontSize: size ?? FONT_SIZE.LG
			}}
		>
			{ children }
		</Text>
	)
}

import { Pressable } from 'react-native'

import { BaseProps } from '../../interfaces/BaseProps'
import { COLORS } from '../../theme'

/** propriedades do botão da paginação */
interface PageButtonProps extends BaseProps {
	/** cor de fundo do botão */
	color?: string

	/** evento de seleção da página */
	onSelect: () => void
}

/** botão da paginação */
export function PageButton({ children, color, onSelect }: PageButtonProps) {
	return (
		<Pressable
			onPress={onSelect}
			style={{
				borderWidth: 2,
				borderColor: COLORS.BLUE_500,
				borderRadius: 12,
				marginHorizontal: 4,
				backgroundColor: color ?? COLORS.GRAY_700,
				width: 48,
				height: 48,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			{ children }
		</Pressable>
	)
}

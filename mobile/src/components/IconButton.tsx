import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native"
import Icon from '@expo/vector-icons/Feather'

import { COLORS } from '../theme'

/** propriedades do botão com ícone */
interface IconButtonProps extends TouchableOpacityProps {
	/** ícone */
	icon: 'chevrons-left' | 'chevrons-right' | 'chevron-left' | 'chevron-right'

	/** cor de  fundo */
	color: 'BLUE' | 'PURPLE'
}

/** botão com ícone */
export function IconButton({ icon, color, ...rest }: IconButtonProps) {
	return (
		<TouchableOpacity
			{...rest}
			activeOpacity={0.75}
			style={[
				{ backgroundColor: COLORS[`${color}_500`] },
				styles.button
			]}
		>
			<Icon name={icon} size={30} color={COLORS.GRAY_100} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		width: 40,
		height: 40,
		borderRadius: 4,
		marginHorizontal: 4,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

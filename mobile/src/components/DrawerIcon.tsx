import Icon from '@expo/vector-icons/Feather'

import { COLORS } from '../theme'

/** propriedades do ícone do menu lateral */
interface DrawerIconProps {
	/** nome do ícone */
	name: any
}

/** ícone do menu lateral */
export function DrawerIcon({ name }: DrawerIconProps) {
	return (
		<Icon
			name={name}
			color={COLORS.GRAY_100}
			size={18}
		/>
	)
}

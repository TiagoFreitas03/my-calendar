import { Platform } from 'react-native'
import { InputProps, Input } from './Input'

/** propriedades do input com máscara */
interface MaskInputProps extends InputProps {
	/** tipo de máscara (data ou hora) */
	mask: 'date' | 'time' | 'hex'

	/** evento de alteração do valor */
	onType: (value: string) => void
}

/** input com máscara */
export function MaskInput({ mask, onType, ...rest }: MaskInputProps) {
	function handleChange(text: string) {
		if (mask === 'date') {
			if (text.length >= 11)
				return

			text = text.replace(/\D/g, '')
			text = text.replace(/^(\d{2})(\d{2})(\d)/, '$1/$2/$3')
		}
		else if (mask === 'time') {
			if (text.length >= 6)
				return

			text = text.replace(/\D/g, '')
			text = text.replace(/^(\d{2})(\d{2})/, '$1:$2')
		}
		else if (mask === 'hex') {
			if (text.length > 7)
				return

			text = text.replace(/[^A-Fa-f0-9]/g, '')
			text = `#${text}`
		}

		onType(text)
	}

	return (
		<Input
			{...rest}
			keyboardType={
				mask === 'date' || mask === 'time' ?
					Platform.OS === 'android' ? 'numeric' : 'number-pad' :
					'default' }
			onChangeText={text => handleChange(text)}
		/>
	)
}

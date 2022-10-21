import { InputProps, Input } from './Input'

/** propriedades do input com máscara */
interface MaskInputProps extends InputProps {
	/** tipo de máscara (data ou hora) */
	mask: 'date' | 'time'

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

		onType(text)
	}

	return (
		<Input
			{...rest}
			onChangeText={text => handleChange(text)}
		/>
	)
}

import { COLORS } from '../theme'

/** propriedades da legenda */
interface SubtitleProps {
	/** cor de fundo */
	color: 'BLUE' | 'PURPLE' | 'PINK' | 'ORANGE' | 'YELLOW'

	/** texto */
	text: string
}

/** legenda para as datas especiais */
export function Subtitle({ color, text }: SubtitleProps) {
	return (
		<p className='my-2'>
			<span
				className="px-2 mr-2"
				style={{
					background: COLORS[color]
				}}
			/>
			{ text }
		</p>
	)
}

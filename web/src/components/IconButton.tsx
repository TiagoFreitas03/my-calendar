import { ButtonHTMLAttributes } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: string
	color: 'blue' | 'purple' | 'pink' | 'orange' | 'yellow'
}

export function IconButton({ icon, color, ...rest }: IconButtonProps) {
	return (
		<button
			className={
				'w-12 h-12 rounded-lg mx-1 icon-button '+
				`bg-${color}-500 hover:bg-${color}-600 transition-colors`
			}
			{...rest}
		>
			<i className={`fa-solid fa-${icon}`} />
		</button>
	)
}

import { ReactNode } from 'react'

/** propriedades do botão da paginação */
interface PageButtonProps {
	/** elementos filhos */
	children: ReactNode

	/** cor de fundo do botão */
	color?: string

	/** evento de seleção da página */
	onSelect: () => void
}

/** botão da paginação */
export function PageButton({ children, color, onSelect }: PageButtonProps) {
	return (
		<span
			className="px-4 py-3 border-2 border-blue-600 rounded-md mx-1 cursor-pointer"
			onClick={onSelect}
			style={{ backgroundColor: color ?? '' }}
		>
			{children}
		</span>
	)
}

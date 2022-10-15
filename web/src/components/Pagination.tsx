import { ReactNode, useMemo } from "react"

import { PageButton } from './PageButton'
import { COLORS } from "../theme"

/** propriedades da paginação */
interface PaginationProps {
	/** página atual */
	current: number
	/** total de páginas */
	total: number
	/** limite do botão de páginas */
	maxPages?: number
	/** elementos filhos */
	children: ReactNode
	/** evento de mudança de página */
	onChange: (page: number) => void
}

/** componente de paginação */
export function Pagination(props: PaginationProps) {
	const { current, total, maxPages = 3, children, onChange: setPage } = props

	/** botões de página */
	const pages = useMemo(() => {
		const pageNumbers = [current]
		let insertBefore = true, insertAfter = true

		for (let count = 1; count < maxPages; count ++) {
			if (insertBefore) {
				const aux = current - count

				if (aux > 0)
					pageNumbers.unshift(aux)
				else
					insertBefore = false
			}

			if (insertAfter) {
				const aux = current + count

				if (aux <= total)
					pageNumbers.push(aux)
				else
					insertAfter = false
			}

			if (!(insertAfter || insertBefore))
				break
		}

		return pageNumbers
	}, [total, current])

	/** função para tratar a mudança de página */
	function handleChangePage(page: number) {
		if (page > 0 && page <= total) {
			window.scrollTo({ top: 0, behavior: 'smooth' })
			setPage(page)
		}
	}

	return (
		<div>
			{children}

			<div className="text-center my-6">
				<PageButton onSelect={() => handleChangePage(current - 1)}>
					<i className="fa-solid fa-chevron-left" />
				</PageButton>

				{pages.map(page => {
					return (
						<PageButton
							key={page}
							onSelect={() => handleChangePage(page)}
							color={current === page ? COLORS.BLUE : ''}
						>
							{page}
						</PageButton>
					)
				})}

				<PageButton onSelect={() => handleChangePage(current + 1)}>
					<i className="fa-solid fa-chevron-right" />
				</PageButton>
			</div>
		</div>
	)
}

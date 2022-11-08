import { ReactNode, useMemo } from "react"
import { View, Text, StyleSheet } from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import { PageButton } from './PageButton'
import { COLORS, FONT_FAMILY, FONT_SIZE } from "../../theme"

/** propriedades da paginação */
interface PaginationProps {
	/** página atual */
	current: number
	/** total de páginas */
	total: number
	/** elementos filhos */
	children: ReactNode
	/** evento de mudança de página */
	onChange: (page: number) => void
}

/** componente de paginação */
export function Pagination(props: PaginationProps) {
	const maxPages = 3
	const { current, total, children, onChange: setPage } = props

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
			setPage(page)
		}
	}

	return (
		<View>
			{children}

			<View style={styles.buttonsContainer}>
				<PageButton onSelect={() => handleChangePage(current - 1)}>
					<Icon name="chevron-left" color={COLORS.GRAY_100} size={24} />
				</PageButton>

				{pages.map(page => {
					return (
						<PageButton
							key={page}
							onSelect={() => handleChangePage(page)}
							color={current === page ? COLORS.BLUE_500 : undefined}
						>
							<Text style={styles.buttonText}>{page}</Text>
						</PageButton>
					)
				})}

				<PageButton onSelect={() => handleChangePage(current + 1)}>
				<Icon name="chevron-right" color={COLORS.GRAY_100} size={24} />
				</PageButton>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	buttonsContainer: {
		marginVertical: 30,
		flexDirection: 'row',
		justifyContent: 'center'
	},

	buttonText: {
		color: COLORS.GRAY_100,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.MD
	}
})

import { ReactNode } from 'react'
import { Dimensions, ScrollView, StyleSheet } from "react-native"

import { COLORS } from '../theme'

/** propriedades do fundo */
interface BackgroundProps {
	/** indica se o conteúdo será centralizado */
	center?: boolean

	/** elementos filhos */
	children: ReactNode
}

/** fundo das telas */
export function Background({ center, children }: BackgroundProps) {
	return (
		<ScrollView
			contentContainerStyle={[
				styles.container,
				center && {
					justifyContent: 'center',
					alignItems: 'center',
					height: Dimensions.get('window').height
				}
			]}
			>
			{ children }
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.GRAY_900,
		flexGrow: 1,
	}
})

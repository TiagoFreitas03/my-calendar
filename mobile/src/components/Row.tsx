import { ReactNode } from 'react'
import { StyleSheet, View } from "react-native"

/** propriedades da linha */
interface RowProps {
	/** elementos filhos */
	children: ReactNode
}

/** linha */
export function Row({ children }: RowProps) {
	return (
		<View style={styles.container}>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	}
})

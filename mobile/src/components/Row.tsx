import { StyleSheet, View } from "react-native"

import { BaseProps } from "../interfaces/BaseProps"

/** linha */
export function Row({ children }: BaseProps) {
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

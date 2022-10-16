import { StatusBar, View, Text } from "react-native"
import { useFonts as useNunito, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { useFonts as useRoboto, Roboto_400Regular } from '@expo-google-fonts/roboto'

import { Home } from './src/screens/Home'

export default function App() {
	const [nunitoLoaded] = useNunito({ Nunito_700Bold })
	const [robotoLoaded] = useRoboto({ Roboto_400Regular })

	if (!(nunitoLoaded && robotoLoaded)) {
		return (
			<View>
				<Text>carregando</Text>
			</View>
		)
	}

	return (
		<>
			<Home />

			<StatusBar />
		</>
	)
}

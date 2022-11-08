import 'react-native-gesture-handler'

import { StatusBar } from "react-native"
import { useFonts as useNunito, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { useFonts as useRoboto, Roboto_400Regular } from '@expo-google-fonts/roboto'

import { AuthContextProvider } from './src/contexts/AuthContext'
import { AppStack } from './src/stacks'
import { Loading } from './src/screens/Loading'

export default function App() {
	const [nunitoLoaded] = useNunito({ Nunito_700Bold })
	const [robotoLoaded] = useRoboto({ Roboto_400Regular })

	if (!(nunitoLoaded && robotoLoaded))
		return <Loading />

	return (
		<AuthContextProvider>
			<AppStack />

			<StatusBar />
		</AuthContextProvider>
	)
}

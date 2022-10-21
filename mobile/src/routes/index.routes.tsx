import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { DrawerRoutes } from './drawer.routes'

const { Navigator, Screen } = createNativeStackNavigator()

/** conjunto de rotas da aplicação */
export function Routes() {
	return (
		<NavigationContainer>
			<Navigator screenOptions={{ headerShown: false }}>
				<Screen name='Home' component={DrawerRoutes} />
			</Navigator>
		</NavigationContainer>
	)
}

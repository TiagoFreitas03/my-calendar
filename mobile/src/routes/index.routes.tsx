import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { DrawerRoutes } from './drawer.routes'

/** tipagem com parâmetros para as rotas */
export type RootStackParamList = {
	/** menu lateral */
	drawer: undefined
	/** tela inicial */
	home: undefined
	/** tela de login */
	login: undefined
	/** tela de cadastro de usuário */
	register: undefined
	/** tela de logout */
	logout: undefined
	/** tela de cadastro de evento */
	create_event: undefined
	/** tela de edição de evento */
	update_event: {
		/** id do evento que será editado */
		id: string
	}
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

/** conjunto de rotas da aplicação */
export function Routes() {
	return (
		<NavigationContainer>
			<Navigator screenOptions={{ headerShown: false }}>
				<Screen name='drawer' component={DrawerRoutes} />
			</Navigator>
		</NavigationContainer>
	)
}

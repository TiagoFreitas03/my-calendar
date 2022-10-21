import { createDrawerNavigator } from '@react-navigation/drawer'

import { useAuth } from '../contexts/AuthContext'
import { Header } from '../components/Header'
import { Drawer } from '../components/Drawer'
import { DrawerIcon as Icon } from '../components/DrawerIcon'
import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'

import { Home } from '../screens/Home'
import { Loading } from '../screens/Loading'
import { Login } from '../screens/user/Login'
import { Register } from '../screens/user/Register'

/** tipagem com parâmetros para as rotas */
export type DrawerStackParamList = {
	/** tela inicial */
	home: undefined
	/** tela de login */
	login: undefined
	/** tela de cadastro de usuário */
	register: undefined
}

const { Navigator, Screen } = createDrawerNavigator<DrawerStackParamList>()

/** rotas que aparecem no menu lateral */
export function DrawerRoutes() {
	const { loading } = useAuth()

	if (loading)
		return <Loading />

	return (
		<Navigator
			drawerContent={props => <Drawer {...props} />}
			screenOptions={{
				header: (props) => <Header {...props} />,
				drawerPosition: 'right',
				drawerActiveBackgroundColor: COLORS.BLUE_500,
				drawerLabelStyle: {
					marginLeft: -20,
					color: COLORS.GRAY_100,
					fontFamily: FONT_FAMILY.REGULAR,
					fontSize: FONT_SIZE.MD
				}
			}}
		>
			<Screen
				name='home'
				component={Home}
				options={{ title: 'Início', drawerIcon: () => <Icon name='home' /> }}
			/>

			<Screen
				name='login'
				component={Login}
				options={{
					title: 'Login',
					drawerIcon: () => <Icon name='log-in' />,
					headerShown: false
				}}
			/>

			<Screen
				name='register'
				component={Register}
				options={{
					title: 'Cadastre-se',
					drawerIcon: () => <Icon name='user' />,
					headerShown: false
				}}
			/>
		</Navigator>
	)
}

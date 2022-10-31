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
import { Logout } from '../screens/user/Logout'
import { Event } from '../screens/events/Event'
import { CreateLabel } from '../screens/CreateLabel'

/** tipagem com parâmetros para as rotas */
export type DrawerStackParamList = {
	/** tela inicial */
	home: undefined
	/** tela de login */
	login: undefined
	/** tela de cadastro de usuário */
	register: undefined
	/** tela de logout */
	logout: undefined
	/** tela de cadastro/edição de evento */
	event: {
		id?: string
	}
	/** tela de cadastro de label */
	label: undefined
}

const { Navigator, Screen } = createDrawerNavigator<DrawerStackParamList>()

/** rotas que aparecem no menu lateral */
export function DrawerRoutes() {
	const { loading, signed } = useAuth()

	if (loading)
		return <Loading />

	return (
		<Navigator
			drawerContent={props => <Drawer {...props} />}
			screenOptions={{
				header: (props) => <Header {...props} />,
				unmountOnBlur: true,
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

			{
				!signed ? (
					<>
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
					</>
				) : (
					<>
						<Screen
							name='event'
							component={Event}
							initialParams={{ id: undefined }}
							options={{ title: 'Criar evento', drawerIcon: () => <Icon name='plus' /> }}
						/>

						<Screen
							name='label'
							component={CreateLabel}
							options={{ title: 'Criar etiqueta', drawerIcon: () => <Icon name='tag' /> }}
						/>

						<Screen
							name='logout'
							component={Logout}
							options={{ title: 'Sair', drawerIcon: () => <Icon name='log-out' /> }}
						/>
					</>
				)
			}
		</Navigator>
	)
}

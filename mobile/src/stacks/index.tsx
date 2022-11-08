import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { useAuth } from '../contexts/AuthContext'
import { StackParamList } from './StackParamList'
import { Drawer } from '../components/Drawer'
import { Header } from '../components/Drawer/Header'

import { Home } from '../screens/Home'
import { Login } from '../screens/user/Login'
import { Register } from '../screens/user/Register'
import { Logout } from '../screens/user/Logout'
import { Event } from '../screens/events/Event'
import { NextEvents } from '../screens/events/NextEvents'
import { EventDetails } from '../screens/events/EventDetails'

const { Navigator, Screen } = createDrawerNavigator<StackParamList>()

export function AppStack() {
	const { signed } = useAuth()

	return (
		<NavigationContainer>
			<Navigator
				drawerContent={() => <Drawer />}
				screenOptions={{
					header: props => <Header {...props} />, unmountOnBlur: true, drawerPosition: 'right'
				}}
			>
				<Screen name='home' component={Home} />

				{
					!signed ? (
						<>
							<Screen name='login' component={Login} options={{ headerShown: false }} />

							<Screen name='register' component={Register} options={{ headerShown: false }} />
						</>
					) : (
						<>
							<Screen name='create_event' component={Event} />

							<Screen name='next_events' component={NextEvents} />

							<Screen name='logout' component={Logout} />

							<Screen name='update_event' component={Event} />

							<Screen name='event_details' component={EventDetails} />
						</>
					)
				}
			</Navigator>
		</NavigationContainer>
	)
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import { Header } from '../components/Header'
import { PublicRoutes } from './public.routes'
import { PrivateRoutes } from './private.routes'

import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'

import { Register } from '../pages/user/Register'
import { Login } from '../pages/user/Login'

import { ChangePassword } from '../pages/user/ChangePassword'
import { ForgotPassword } from '../pages/user/ForgotPassword'
import { ResetPassword } from '../pages/user/ResetPassword'

import { Event } from '../pages/events/Event'
import { EventDetails } from '../pages/events/EventDetails'
import { NextEvents } from '../pages/events/NextEvents'
import { DayEvents } from '../pages/events/DayEvents'

/** conjunto de rotas da aplicação */
export function Router() {
	const { signed, loading } = useAuth()

	if (loading) {
		return (
			<div className='h-[100vh] flex justify-center items-center'>
				<h1>Carregando...</h1>
			</div>
		)
	}

	return (
		<BrowserRouter>
			<div className='flex flex-col min-h-screen'>
				<Header />

				<main className='flex flex-1'>
					<Routes>
						<Route path='/' element={<Home />} />

						<Route element={<PublicRoutes signed={signed} />}>
							<Route path='/register' element={<Register />} />
							<Route path='/login' element={<Login />} />
							<Route path='/forgot_password' element={<ForgotPassword />} />
							<Route path='/reset_password/:id' element={<ResetPassword />} />
						</Route>

						<Route element={<PrivateRoutes signed={signed} />}>
							<Route path='/change_password' element={<ChangePassword />} />
							<Route path='/create_event' element={<Event />} />
							<Route path='/edit_event/:id' element={<Event />} />
							<Route path='/event/:id' element={<EventDetails />} />
							<Route path='/next_events' element={<NextEvents />} />
							<Route path='/day_events/:date' element={<DayEvents />} />
						</Route>

						<Route path='*' element={<NotFound />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	)
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import { Header } from '../components/Header'
import { PublicRoutes } from './public.routes'
import { PrivateRoutes } from './private.routes'

import { Home } from '../pages/Home'

import { Register } from '../pages/user/Register'
import { Login } from '../pages/user/Login'
import { Logout } from '../pages/user/Logout'

/** conjunto de rotas da aplicação */
export function Router() {
	const { signed } = useAuth()

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
						</Route>

						<Route element={<PrivateRoutes signed={signed} />}>
							<Route path='/logout' element={<Logout />} />
						</Route>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	)
}

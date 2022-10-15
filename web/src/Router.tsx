import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header'

import { Home } from './pages/Home'
import { Register } from './pages/user/Register'

export function Router() {
	return (
		<BrowserRouter>
			<div className='flex flex-col min-h-screen'>
				<Header />

				<main className='flex flex-1'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/register' element={<Register />} />

					</Routes>
				</main>
			</div>
		</BrowserRouter>
	)
}

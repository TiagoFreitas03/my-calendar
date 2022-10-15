import { Link } from 'react-router-dom'

import { logo } from '../assets'
import { Sidebar } from './Sidebar'

export function Header() {
	function toggleSidebar() {
		const sidebar = document.getElementById('sidebar')

		if (sidebar)
			sidebar.classList.toggle('toggled')
	}

	return (
		<>
			<header
				className={
					"bg-gray-700 w-full h-24 flex items-center px-8 py-4 border-gray-600 border-b-2"
				}
			>
				<Link to='/'>
					<img src={logo} alt="MyCalendar" className='w-60' />
				</Link>

				<p className='ml-6 py-1 pl-6 border-l border-gray-300 sm:block hidden'>
					Para uma vida mais organizada
				</p>

				<i
					className='fa-solid fa-bars ml-auto cursor-pointer text-2xl'
					onClick={toggleSidebar}
				/>
			</header>

			<Sidebar onClose={toggleSidebar} />
		</>
	)
}

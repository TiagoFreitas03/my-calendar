import { useEffect, useState } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import { UsersController } from '../controllers/UsersController'
import { User } from '../interfaces/User'
import '../styles/sidebar.tailwind.css'

/** propriedades da sidebar */
interface SidebarProps {
	/** evento de fechamento da sidebar */
	onClose: () => void
}

/** propriedades do link do menu */
interface MenuLinkProps extends LinkProps {
	/** texto do link */
	text: string

	/** ícone no link */
	icon: string
}

export function Sidebar({ onClose: close }: SidebarProps) {
	const { signed, signOut } = useAuth()

	const [user, setUser] = useState<User>()

	useEffect(() => {
		if (signed)
			new UsersController().show().then(data => setUser(data))
		else
			setUser(undefined)
	}, [signed])

	function MenuLink({ icon, text, ...rest }: MenuLinkProps) {
		return (
			<Link {...rest} className='border hover:bg-blue-500 p-2 text-base' onClick={close}>
				<i className={`mr-1 fa-solid fa-${icon}`} /> {text}
			</Link>
		)
	}

	return (
		<aside
			className={
				"fixed h-screen max-w-[360px] w-[80vw] top-0 right-0 mr-[-80vw] py-6 px-5 transition-all " +
				"bg-gray-700 border-l-2 border-gray-600 text-center flex flex-col justify-between"
			}
			id="sidebar"
		>
			<header className='flex flex-col justify-center text-center'>
				<i className='fas fa-times fa-2x absolute top-8 right-8 cursor-pointer' onClick={close} />

				{ user ?
					<>
						<img
							src={user.picture ?? ''}
							alt={user.name}
							className='p-1 bg-white border rounded-[50%] w-20 h-20 mx-auto mb-4'
						/>

						<strong>{user.name}</strong>
					</> :
					<h3 className='leading-7 text-2xl'>Bem-vindx ao<br />MyCalendar</h3>
				}
			</header>

			{ user ?
				<div>
					<MenuLink icon='home' text='Página Inicial' to='/' />
					<MenuLink icon='calendar-plus' text='Cadastrar Evento' to='/create_event' />
					<MenuLink icon='calendar-days' text='Próximos Eventos' to='/next_events' />
					<MenuLink icon='key' text='Alterar Senha' to='/change_password' />

					<button
						className='border hover:bg-blue-500 p-2 text-base w-full'
						onClick={() => {
							signOut()
							close()
						}}
					>
						<i className='mr-1 fa-solid fa-arrow-right-from-bracket' />Sair
					</button>
				</div> :
				<div>
					<Link to='/login' className='bg-blue-500 hover:bg-blue-600' onClick={close}>
						Entrar
					</Link>

					<Link to='/register' className='bg-purple-500 hover:bg-purple-600' onClick={close}>
						Cadastre-se
					</Link>
				</div>
			}

			<footer className='mb-3'>
				<p>&copy; 2022 MyCalendar</p>
			</footer>
		</aside>
	)
}

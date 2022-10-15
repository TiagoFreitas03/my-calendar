import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Input } from '../../components/Input'
import { UsersController } from '../../controllers/UsersController'
import { useAlert } from '../../contexts/AlertContext'
import { useAuth } from '../../contexts/AuthContext'

/** página de login */
export function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const alert = useAlert()
	const { signIn } = useAuth()
	const navigate = useNavigate()

	/** trata o evento de submit do form de login */
	async function handleLoginFormSubmit(event: FormEvent) {
		event.preventDefault()

		try {
			const { token } = await new UsersController().login(email, password)
			signIn(token)
			navigate('/')
		} catch (err: any) {
			const { message } = err.response.data

			alert.show('Ocorreu um erro!', message)
		}
	}

	return (
		<div className="w-full max-w-lg mx-auto flex items-center text-gray-100">
			<form
				className="border border-gray-600 bg-gray-700 rounded p-6 w-full"
				onSubmit={handleLoginFormSubmit}
			>
				<strong className='block text-2xl mb-5'>Faça login para continuar</strong>

				<Input
					label='E-mail'
					type='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>

				<Input
					label='Senha'
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>

				<div className="flex items-center justify-between mt-6 mb-1">
					<button
						className="bg-blue-500 hover:bg-blue-600 py-2 px-8 rounded text-xl text-gray-50"
						type="submit"
					>
						Entrar
					</button>

					<Link
						className="inline-block align-baseline text-blue-500 hover:text-blue-600"
						to="/forgot_password"
					>
						Esqueceu sua senha?
					</Link>
				</div>
			</form>
		</div>
	)
}

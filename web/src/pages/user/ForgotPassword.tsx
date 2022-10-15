import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from '../../components/Input'
import { useAlert } from '../../contexts/AlertContext'
import { PasswordsController } from '../../controllers/PasswordsController'

/** página de esquecimento de senha */
export function ForgotPassword() {
	const [email, setEmail] = useState('')

	const alert = useAlert()
	const navigate = useNavigate()

	async function handleForgotPasswordFormSubmit(event: FormEvent) {
		event.preventDefault()

		alert.show('Aguarde...', 'Processando sua solicitação')

		try {
			const message = await new PasswordsController().retrieve(email)
			alert.show('Tudo certo!', message, 4000)
			setTimeout(() => { navigate('/login') }, 4000)
		} catch (err: any) {
			alert.show('Ocorreu um erro!', err.response.data.message)
		}
	}

	return (
		<div className="w-full max-w-lg mx-auto flex items-center text-gray-100">
			<form
				className="border border-gray-600 bg-gray-700 rounded p-6 w-full"
				onSubmit={handleForgotPasswordFormSubmit}
			>
				<strong className='block text-xl mb-5'>
					Informe seu e-mail para redefinir sua senha
				</strong>

				<Input type='email' value={email} onChange={e => setEmail(e.target.value)} />

				<div className="flex items-center justify-between mt-4 mb-1">
					<button
						className="bg-blue-500 hover:bg-blue-600 py-2 px-8 rounded text-lg text-gray-50"
						type="submit"
					>
						Enviar
					</button>
				</div>
			</form>
		</div>
	)
}

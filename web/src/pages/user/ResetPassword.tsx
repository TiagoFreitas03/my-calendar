import { FormEvent, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { Input } from '../../components/Input'
import { PasswordsController } from "../../controllers/PasswordsController"
import { useAlert } from '../../contexts/AlertContext'

/** página para redefinição da senha */
export function ResetPassword() {
	const [password, setPassword] = useState('')

	const alert = useAlert()
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()

	async function handleResetPasswordFormSubmit(event: FormEvent) {
		event.preventDefault()

		try {
			const message = await new PasswordsController().reset(password, id ?? '')

			alert.show('Tudo certo!', message)

			setTimeout(() => { navigate('/login') }, 1000)
		} catch (err: any) {
			alert.show('Ocorreu um erro!', err.response.data.message)
		}
	}

	return (
		<div className="w-full max-w-lg mx-auto flex items-center text-gray-100">
			<form
				className="border border-gray-600 bg-gray-700 rounded p-6 w-full"
				onSubmit={handleResetPasswordFormSubmit}
			>
				<strong className='block text-xl mb-5'>Escolha sua nova senha</strong>

				<Input type='password' value={password} onChange={e => setPassword(e.target.value)} />

				<div className="flex items-center justify-between mt-4 mb-1">
					<button
						className="bg-blue-500 hover:bg-blue-600 py-2 px-8 rounded text-lg text-gray-50"
						type="submit"
					>
						Confirmar
					</button>
				</div>
			</form>
		</div>
	)
}

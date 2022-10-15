import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from '../../components/Input'
import { UsersController } from '../../controllers/UsersController'
import { useAlert } from '../../contexts/AlertContext'

/** erros dos campos de cadastro de usuário */
interface CreateUserError {
	name?: string
	email?: string
	password?: string
	picture?: string
	birth_date?: string
}

/** página de cadastro de usuário */
export function Register() {
	const alert = useAlert()
	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [picture, setPicture] = useState<File>()
	const [birth_date, setBirthDate] = useState('')
	const [error, setError] = useState<CreateUserError>()

	/** trata o evento de submit do formulário de cadastro de usuário */
	async function handleRegisterFormSubmit(event: FormEvent) {
		event.preventDefault()

		try {
			const data = { name, email, password, birth_date, picture }
			const res = await new UsersController().create(data)

			alert.show('Tudo OK!', res.message)

			navigate('/login')
		} catch (err: any) {
			const { message, errors } = err.response.data

			if (errors)
				setError(errors)

			alert.show('Ocorreu um erro!', message)
		}
	}

	/** trata a seleção da imagem do usuário */
	function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
		if (!event.target.files)
			return

		const selectedImage = Array.from(event.target.files)[0]
		setPicture(selectedImage)
	}

	return (
		<div className="w-full max-w-lg mx-auto flex items-center text-gray-100">
			<form
				className="border border-gray-600 bg-gray-700 rounded p-6 w-full my-2"
				onSubmit={handleRegisterFormSubmit}
			>
				<strong className='block text-2xl mb-4'>Cadastre-se</strong>

				<Input
					label='Nome'
					error={error?.name ?? ''}
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
				/>

				<Input
					label='E-mail'
					error={error?.email ?? ''}
					type='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>

				<Input
					label='Senha'
					error={error?.password ?? ''}
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>

				<Input
					label='Data de Nascimento'
					error={error?.birth_date ?? ''}
					type='date'
					value={birth_date}
					onChange={e => setBirthDate(e.target.value)}
				/>

				<Input
					label='Foto'
					error={error?.picture ?? ''}
					type='file'
					onChange={handleSelectImage}
				/>

				<div className="flex items-center justify-between mt-6 mb-3">
					<button
						className="bg-blue-500 hover:bg-blue-600 py-2 px-8 rounded text-lg text-gray-50"
						type="submit"
					>
						Cadastrar
					</button>
				</div>
			</form>
		</div>
	)
}

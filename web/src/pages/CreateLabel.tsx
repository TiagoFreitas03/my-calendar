import { FormEvent, useState } from 'react'

import { LabelsController } from '../controllers/LabelsController'
import { useAlert } from '../contexts/AlertContext'
import { Input } from '../components/Input'

/** mensagens de erro para os campos de cadastro de label */
interface CreateLabelError {
	name?: string
	color?: string
}

/** página para cadastro de label */
export function CreateLabel() {
	const [name, setName] = useState('')
	const [color, setColor] = useState('')
	const [error, setError] = useState<CreateLabelError>()

	const { show } = useAlert()

	/** trata o evento submit do form de cadastro de label */
	async function handleCreateLabelFormSubmit(event: FormEvent) {
		event.preventDefault()

		try {
			const { message } = await new LabelsController().create(name, color)

			show('Tudo certo!', message)
		} catch (err: any) {
			const { message, errors } = err.response.data

			if (errors)
				setError(errors)
			else
				setError(undefined)

			show('Ocorreu um erro!', message)
		}
	}

	return (
		<div className='block w-full sm:w-[480px] mx-auto px-4 mt-8'>
			<h2>Nova Etiqueta</h2>

			<form className='mt-4' onSubmit={handleCreateLabelFormSubmit}>
				<Input
					label="Nome"
					type="text"
					value={name}
					onChange={e => setName(e.target.value)}
					error={error?.name}
				/>

				<div className='mb-4'>
					<label className="block mb-2">Cor { error?.color &&
						<span className='text-red-400 ml-2'>{error.color}*</span>
					}</label>

					<input
						className="border rounded w-full h-12 py-1 px-3 mb-3 text-gray-900 bg-white"
						type="color"
						value={color}
						onChange={e => setColor(e.target.value)}
					/>
				</div>

				<button className="bg-blue-500 hover:bg-blue-600 py-2 px-8 rounded" type="submit">
					Cadastrar
				</button>
			</form>
		</div>
	)
}

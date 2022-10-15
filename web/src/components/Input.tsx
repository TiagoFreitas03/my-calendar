import { InputHTMLAttributes } from 'react'

/** propriedades do input */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	/** título do campo */
	label?: string

	/** mensagem do erro de validação */
	error?: string
}

/** input padrão */
export function Input({ label, error, ...rest }: InputProps) {
	return (
		<div className="mb-4">
			{
				label &&
				<label className="block mb-2">
					{ label }
					{ error && <span className='text-red-400 ml-2'>{error}*</span> }
				</label>
			}

			<input
				className="border rounded w-full py-2 px-3 mb-3 text-gray-900 bg-white"
				{...rest}
			/>
		</div>
	)
}

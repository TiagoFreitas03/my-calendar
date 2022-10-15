import { useState, createContext, useContext } from 'react'

import { ContextProps } from '../interfaces/Context'

/** propriedades do contexto de alerta */
interface IAlertContextProps {
	/** função para exibir o alerta com uma mensagem */
	show: (title: string, message: string, timeout?: number) => void
}

/** contexto do alerta */
const AlertContext = createContext({} as IAlertContextProps)

/** provedor do contexto de alerta */
export function AlertContextProvider({ children }: ContextProps) {
	const [alertId, setAlertId] = useState('')
	const [title, setTitle] = useState('')
	const [message, setMessage] = useState('')

	/** esconde o alerta */
	function hide(alertId: string) {
		if (document.getElementById(alertId)) {
			setTitle('')
			setMessage('')
		}
	}

	/**
	 * exibe o alerta
	 * @param title título
	 * @param message mensagem do corpo
	 * @param timeout tempo de exibição
	 */
	function show(title: string, message: string, timeout: number = 3000) {
		/** id do elemento de alerta */
		const newId = String(new Date().getTime())

		setAlertId(newId)
		setTitle(title)
		setMessage(message)

		setTimeout(() => hide(newId), timeout)
	}

	return (
		<AlertContext.Provider value={{ show }}>
			<div className="fixed flex justify-center bottom-8 left-8 mr-8">
				{ message !== '' && title !== '' &&
					<div
						className="bg-gray-700 border border-gray-600 rounded-sm"
						id={alertId}
					>
						<header className='bg-blue-500 text-gray-700 pl-4 pr-2 py-2 flex justify-between'>
							<strong>{title}</strong>

							<span
								className='cursor-pointer text-xl ml-4'
								onClick={() => hide(alertId)}
							>
								&times;
							</span>
						</header>

						<span className='block p-4'>{message}</span>
					</div>
				}
			</div>

			{children}
		</AlertContext.Provider>
	)
}

/** hook para utilização do contexto de alerta */
export const useAlert = () => useContext(AlertContext)

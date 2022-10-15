import { createContext, useContext, useState, useEffect } from 'react'

import { api } from '../services/api'
import { ContextProps } from '../interfaces/Context'

/** dados do contexto de autenticação */
interface AuthContextData {
	/** JWT */
	token: string
	/** indica se o usuário está logado */
	signed: boolean
	/** indica se o carregamento das informações locais já foi feito */
	loading: boolean
	/** função de login */
	signIn: (token: string) => void
	/** função de logout */
	signOut: () => void
}

/** contexto de autenticação */
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

/** provedor do contexto de autenticação */
export function AuthContextProvider({ children }: ContextProps) {
	const [token, setToken] = useState('')
	const [loading, setLoading] = useState(true)

	/** configura o token no header das requisição à API */
	function setApiHeader(token: string) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`

		setToken(token)
	}

	useEffect(() => {
		const storagedToken = localStorage.getItem('token')

		if (storagedToken)
			setApiHeader(storagedToken)

		setLoading(false)
	}, [])

	/**
	 * salva localmente o token do usuário
	 * @param token JWT para autenticação
	 */
	function signIn(token: string) {
		localStorage.setItem('token', token)

		setApiHeader(token)
	}

	/** limpa o token salvo localmente */
	function signOut() {
		localStorage.removeItem('token')

		setToken('')
	}

	return (
		<AuthContext.Provider
			value={{
				token,
				loading,
				signed: token !== '',
				signIn,
				signOut
			}}
		>
			{ children }
		</AuthContext.Provider>
	)
}

/** hook para utilização do contexto de autenticação */
export const useAuth = () => useContext(AuthContext)

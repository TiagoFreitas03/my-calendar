import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import * as SecureStore from 'expo-secure-store'

import { api } from '../services/api'

/** propriedades do contexto */
interface ContextProps {
	/** elementos filhos */
	children: ReactNode
}

/** dados do contexto de autenticação */
interface AuthContextData {
	/** JWT */
	token: string
	/** indica se o usuário está logado */
	signed: boolean
	/** indica se o carregamento das informações locais já foi feito */
	loading: boolean
	/** função de login */
	signIn: (token: string) => Promise<void>
	/** função de logout */
	signOut: () => Promise<void>
}

/** contexto de autenticação */
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

/** provedor do contexto de autenticação */
export function AuthContextProvider({ children }: ContextProps) {
	const [token, setToken] = useState('')
	const [loading, setLoading] = useState(true)

	/** configura o token no header das requisição à API */
	function setApiHeader(t: string) {
		api.defaults.headers.common['Authorization'] = `Bearer ${t}`
		setToken(t)
	}

	useEffect(() => {
		async function getLocalData() {
			const storagedToken = await SecureStore.getItemAsync('token')

			if (storagedToken)
				setApiHeader(storagedToken)
		}

		getLocalData().then(() => setLoading(false))
	}, [])

	/**
	 * salva localmente o token do usuário
	 * @param token JWT para autenticação
	 */
	async function signIn(token: string) {
		await SecureStore.setItemAsync('token', token)
		setApiHeader(token)
	}

	/** limpa o token salvo localmente */
	async function signOut() {
		await SecureStore.deleteItemAsync('token')
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

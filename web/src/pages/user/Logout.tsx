import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../../contexts/AuthContext"

/** página de logout */
export function Logout() {
	const { signOut } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			signOut()
			navigate('/')
		}, 1000)
	}, [])

	return (
		<div className="w-full text-center my-auto">
			<h2>Você será redirecionado para <br />a página inicial em instantes...</h2>
		</div>
	)
}

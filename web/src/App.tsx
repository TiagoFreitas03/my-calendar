import { AuthContextProvider } from "./contexts/AuthContext"
import { AlertContextProvider } from './contexts/AlertContext'

import { Router } from "./Routes"

/** componente principal da aplicação */
export function App() {
	return (
		<AuthContextProvider>
			<AlertContextProvider>
				<Router />
			</AlertContextProvider>
		</AuthContextProvider>
	)
}

import { AuthContextProvider } from "./contexts/AuthContext"
import { Router } from "./Router"

/** componente principal da aplicação */
export function App() {
	return (
		<AuthContextProvider>
			<Router />
		</AuthContextProvider>
	)
}

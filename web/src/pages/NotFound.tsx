import { Link } from "react-router-dom"

/** página não encontrada */
export function NotFound() {
	return (
		<div className="w-full text-center my-auto leading-loose">
			<h1>Erro 404</h1>

			<h2>Página não encontrada</h2>

			<Link to={'/'} className="block mt-4 text-blue-500 underline">
				<i className="fa-solid fa-home" /> Voltar a página inicial
			</Link>
		</div>
	)
}

import { Response, Request, Router } from 'express'

/** propriedades da rota */
interface IRoute {
	/** caminho (url) */
	path: string
	/** método HTTP */
	method: 'get' | 'post' | 'patch' | 'put' | 'delete'
	/** função que vai receber a requisição e devolver a resposta */
	handler: (req: Request, res: Response) => Promise<Response>
	/** middlewares da rota */
	middlewares: any
}

/** controller base para implementação das rotas */
export abstract class Controller {
	/** primeira parte da url da rota */
	private prefix: string

	/** instância de Router para mapeamento das rotas */
	private router: Router

	/** array de objetos que implementam a interface IRoute */
	protected routes: IRoute[] = []

	/**
	 * instancia o controller e inicia o router
	 * @param prefix primeira parte da rota
	 */
	constructor(prefix?: string) {
		this.router = Router()
		this.prefix = prefix ?? ''
	}

	/** configura método HTTP, middlewares, e função para cada rota. Retorna um objeto Router */
	setRoutes() {
		for (const route of this.routes)
			this.router[route.method](this.prefix + route.path, ...route.middlewares, route.handler)

		return this.router
	}
}

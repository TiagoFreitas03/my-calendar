import express, { Application } from 'express'
import cors from 'cors'
import path from 'path'
import 'express-async-errors'

import { Controller } from './controllers/_Controller'
import { errorHandler } from './errors'

export class Server {
	/** aplicação express */
	private app: Application
	/** porta que a aplicação ficará monitorando */
	private port: number
	/** controllers da aplicação */
	private controllers: Controller[]

	/**
	 * instancia o server, configura middlewares globais, e rotas
	 * @param port número da porta que o servidor ficará monitorando
	 * @param controllers array de controllers da aplicação
	 */
	constructor(port: number, controllers: Controller[]) {
		// configurações gerais
		this.app = express()
		this.port = port
		this.controllers = controllers

		// middlewares globais
		this.app.use(cors())
		this.app.use(express.json())
		this.app.use('/images', express.static(path.join(__dirname, '..', 'uploads')))

		// configura rotas dos controllers
		this.loadControllers()

		// tratamento de erros
		this.app.use(errorHandler)
	}

	/** executa servidor */
	execute() {
		return this.app.listen(this.port, () => {
			console.log(`server running on port: ${this.port}`)
		})
	}

	/** executa o método setRoutes de cada controller */
	private loadControllers() {
		this.controllers.forEach(controller => {
			this.app.use(controller.setRoutes())
		})
	}
}

import 'dotenv/config'

import { Server } from './Server'
import { UsersController } from './controllers/UsersController'

const port = Number(process.env.PORT) ?? 3333

const controllers = [
	new UsersController()
]

const server = new Server(port, controllers)

server.execute()

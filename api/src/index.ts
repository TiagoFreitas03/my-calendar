import 'dotenv/config'

import { Server } from './Server'
import { UsersController } from './controllers/UsersController'
import { LabelsController } from './controllers/LabelsController'

const port = Number(process.env.PORT) ?? 3333

const controllers = [
	new UsersController(),
	new LabelsController()
]

const server = new Server(port, controllers)

server.execute()

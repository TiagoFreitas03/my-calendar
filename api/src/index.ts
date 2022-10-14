import 'dotenv/config'

import { Server } from './Server'
import { UsersController } from './controllers/UsersController'
import { LabelsController } from './controllers/LabelsController'
import { EventsController } from './controllers/EventsController'

const port = Number(process.env.PORT) ?? 3333

const controllers = [
	new UsersController(),
	new LabelsController(),
	new EventsController()
]

const server = new Server(port, controllers)

server.execute()

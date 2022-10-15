import 'dotenv/config'

import { Server } from './Server'
import { toNumber } from './utils/convertions'

import { UsersController } from './controllers/UsersController'
import { LabelsController } from './controllers/LabelsController'
import { EventsController } from './controllers/EventsController'
import { PasswordsController } from './controllers/PasswordsController'

const port = toNumber(process.env.PORT, 3333)

const controllers = [
	new UsersController(),
	new LabelsController(),
	new EventsController(),
	new PasswordsController()
]

const server = new Server(port, controllers)

server.execute()

import 'dotenv/config'

import { Server } from './Server'
import { toNumber } from './utils/convertions'

import { UsersController } from './controllers/UsersController'
import { EventsController } from './controllers/EventsController'
import { PasswordsController } from './controllers/PasswordsController'
import { DatesController } from './controllers/DatesController'

const port = toNumber(process.env.PORT, 3333)

const controllers = [
	new UsersController(),
	new EventsController(),
	new PasswordsController(),
	new DatesController()
]

const server = new Server(port, controllers)

server.execute()

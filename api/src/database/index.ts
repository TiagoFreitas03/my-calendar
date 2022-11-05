import { PrismaClient } from '@prisma/client'

/** conexão com o banco de dados */
const database = new PrismaClient()

export {
	database
}

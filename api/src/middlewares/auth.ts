import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { ApiError } from '../errors/ApiError'
import { UsersRepository } from '../repositories/UsersRepository'

interface DecodedToken {
	id: string
}

const JWT_SECRET = process.env.JWT_SECRET ?? ''

async function verifyJwt(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers

	if (!authorization)
		throw new ApiError('Nenhum token fornecido.', 401)

	const [_, token] = authorization.split(' ')

	/** token decodificado */
	const decoded = await verify(token, JWT_SECRET) as DecodedToken

	await new UsersRepository().findById(decoded.id)

	req.user_id = decoded.id

	return next()
}

export { verifyJwt }

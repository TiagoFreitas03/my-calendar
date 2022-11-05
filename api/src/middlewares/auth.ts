import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { ApiError } from '../errors/ApiError'
import { UsersRepository } from '../repositories/UsersRepository'

/** propriedades do JWT decodificado */
interface DecodedToken {
	id: string
}

/** segredo para decodificar o JWT */
const JWT_SECRET = process.env.JWT_SECRET ?? ''

/** função que verifica se o usuário está logado e possui um JWT válido */
async function verifyJwt(req: Request, _res: Response, next: NextFunction) {
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

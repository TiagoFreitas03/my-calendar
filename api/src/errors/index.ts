import path from 'path'
import fs from 'fs'
import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'
import { JsonWebTokenError } from 'jsonwebtoken'

import { ApiError } from './ApiError'
import { EntityNotFoundError } from './EntityNotFoundError'
import { ValidationErrors } from './ValidationErrors'

/** função para tratamento de erros comuns na aplicação */
export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
	// exclusão de arquivos enviados por upload, caso ocorra algum erro
	if (req.file) {
		const file = path.join(__dirname, '..', '..', 'uploads', req.file.filename)

		if (fs.existsSync(file))
			fs.unlinkSync(file)
	}

	// erro padrão da API
	if (error instanceof ApiError) {
		const { message, status } = error

		return res.status(status).json({ message })
	}

	// erros de recurso não encontrado no banco de dados
	if (error instanceof EntityNotFoundError) {
		const { model, filters } = error

		return res.status(404).json({
			message: `Recurso do tipo ${model} não encontrado.`,
			filters
		})
	}

	// erros ocorridos na validação feita pelo yup
	if (error instanceof ValidationError) {
		/** erros de validação */
		const errors: ValidationErrors = {}

		error.inner.forEach(err => {
			if (err.path)
				errors[err.path] = err.errors
		})

		return res.status(400).json({
			message: 'Validação falhou.',
			errors
		})
	}

	// erros de decodificação do JWT
	if (error instanceof JsonWebTokenError) {
		return res.status(401).send({ message: 'Token inválido.' })
	}

	console.error(error)

	// erro não identificado
	return res.status(500).json({ message: 'Erro interno do servidor.' })
}

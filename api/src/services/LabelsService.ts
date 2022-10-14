import * as yup from 'yup'

import { Service } from './_Service'
import { LabelsRepository } from '../repositories/LabelsRepository'
import { ApiError } from '../errors/ApiError'
import { LabelData } from '../interfaces/Label'

/** service de labels */
export class LabelsService extends Service<LabelsRepository> {
	constructor() {
		super(LabelsRepository)
	}

	/** valida dados e cadastra label no banco */
	async create(data: LabelData) {
		/** esquema de validação dos dados */
		const schema = yup.object().shape({
			name: yup.string().required('Informe o nome da etiqueta'),
			color: yup.string().required('Informe a cor da etiqueta')
				.matches(/^[0-9A-F]{6}$/i, 'Cor inválida'),
			user_id: yup.string().required('Usuário inválido')
		})

		await schema.validate(data, { abortEarly: false })

		return this.repository.create(data)
	}

	/**
	 * busca e retorna lista de labels filtradas pelo nome
	 * @param name nome da label
	 * @param user_id id do usuário criador da label
	 */
	search = (name: string, user_id: string) => this.repository.searchByName(name, user_id)

	/**
	 * exclui label do banco de dados
	 * @param id id da label a ser excluída
	 * @param user_id id do usuário criador da label
	 */
	async delete(id: number, user_id: string) {
		const label = await this.repository.findById(id)

		if (label.user_id != user_id)
			throw new ApiError('Você não pode excluir esta etiqueta', 403)

		await this.repository.delete(id)
	}
}

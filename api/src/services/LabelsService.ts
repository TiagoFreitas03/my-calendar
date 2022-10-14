import * as yup from 'yup'

import { Service } from './_Service'
import { LabelsRepository } from '../repositories/LabelsRepository'

/** Dados para cadastro de label */
interface LabelData {
	name: string
	color: string
	user_id: string
}

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
}

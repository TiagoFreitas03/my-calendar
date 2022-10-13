import { database } from '../database'

/** Dados para cadastro de label */
interface LabelData {
	name: string
	color: string
	user_id: string
}

/** Repositório de labels */
export class LabelsRepository {
	/**
	 * cadastra label no banco e retorna o id
	 * @param data dados de cadastro da label
	 */
	async create(data: LabelData) {
		const label = await database.label.create({ data })

		return label.id
	}
}

import { database } from '../database'
import { EntityNotFoundError } from '../errors/EntityNotFoundError'
import { LabelData } from '../interfaces/Label'

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

	/**
	 * busca e retorna lista de labels filtrada pelo nome
	 * @param name nome da label
	 * @param user_id id do usuário criador da label
	 */
	searchByName(name: string, user_id: string) {
		return database.label.findMany({
			where: {
				name: { contains: name },
				user_id
			},
			take: 10,
			orderBy: [
				{ name: 'asc' }
			]
		})
	}

	/**
	 * busca e retorna uma label filtrando pelo id
	 * @param id id da label
	 */
	async findById(id: number) {
		const label = await database.label.findFirst({
			where: { id }
		})

		if (!label)
			throw new EntityNotFoundError('etiqueta', { id })

		return label
	}

	/**
	 * exclui label do banco de dados
	 * @param id id da label
	 */
	async delete(id: number) {
		await database.label.delete({
			where: { id }
		})
	}
}

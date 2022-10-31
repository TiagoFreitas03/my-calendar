import { Label } from '../interfaces/Label'
import { api } from '../services/api'

/** propriedades da resposta do cadastro de label */
interface CreateLabelResponse {
	/** mensagem */
	message: string
	/** dados da label criada */
	label: Label
}

/** controller de labels */
export class LabelsController {
	/**
	 * pesquisa labels filtrando pelo nome
	 * @param name nome da label
	 */
	async search(name?: string) {
		const res = await api.get(`label?name=${name ?? ''}`)

		return res.data as Label[]
	}

	/**
	 * envia à API os dados para cadastro de label
	 * @param name nome
	 * @param color cor
	 */
	async create(name: string, color: string) {
		color = color.replace('#', '')

		const res = await api.post('label', { name, color })

		return res.data as CreateLabelResponse
	}
}

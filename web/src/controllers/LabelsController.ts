import { Label } from '../interfaces/Label'
import { api } from '../services/api'

export class LabelsController {
	/**
	 * pesquisa labels filtrando pelo nome
	 * @param name nome da label
	 */
	async search(name?: string) {
		const res = await api.get(`label?name=${name ?? ''}`)

		return res.data as Label[]
	}
}

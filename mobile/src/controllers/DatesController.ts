import { Reference, SpecialDates } from "../interfaces/SpecialDate"
import { api } from "../services/api"

/** controller de datas especiais */
export class DatesController {
	/** busca datas especiais no mês e ano especificados */
	async listByReference({ month, year }: Reference) {
		const res = await api.get(`dates/${month}/${year}`)

		return res.data as SpecialDates
	}
}

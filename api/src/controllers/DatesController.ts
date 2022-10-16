import { Request, Response } from "express"

import { Controller } from "./_Controller"
import { DatesService } from "../services/DatesService"
import { toNumber } from "../utils/convertions"

/** controller de datas especiais (feriados, datas comemorativas e pontos facultativo) */
export class DatesController extends Controller {
	constructor() {
		super('/dates')

		this.routes = [
			// retorna datas especiais filtradas pelo ano e mês
			{
				path: '/:month/:year',
				method: 'get',
				handler: this.listByReference,
				middlewares: []
			}
		]
	}

	/** retorna lista de datas especiais no mês e ano especificados */
	async listByReference(req: Request, res: Response) {
		const { month, year } = req.params

		const m = toNumber(month, new Date().getMonth() + 1)
		const y = toNumber(year, new Date().getFullYear())

		const service = new DatesService(m - 1, y)

		const dates = service.listByReference()

		return res.json({
			dates,
			holidays: dates.filter(d => d.type === 'FN').map(d => d.day),
			celebrations: dates.filter(d => d.type === 'DC').map(d => d.day),
			others: dates.filter(d => d.type === 'PF').map(d => d.day)
		})
	}
}

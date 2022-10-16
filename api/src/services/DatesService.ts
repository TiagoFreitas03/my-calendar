import { add, sub } from 'date-fns'

import { SpecialDate, VariableSpecialDate } from '../interfaces/Date'
import { specialDates } from '../utils/dates'

/** service de dates */
export class DatesService {
	/** datas especiais */
	private dates: SpecialDate[]
	/** mês das datas especiais */
	private month: number
	/** ano das datas especiais */
	private year: number

	/**
	 * instancia o service de dates
	 * @param m mês
	 * @param y ano
	 */
	constructor(m: number, y: number) {
		this.dates = []
		this.month = m
		this.year = y
	}

	/** retorna lista de datas especiais no mês e ano especificados */
	listByReference() {
		this.dates.push(...specialDates[this.month])

		/** datas especiais com dia/mês variável */
		const variableDates = this.variableDates()

		this.dates.push(...variableDates)
		this.dates.sort((x, y) => x.day - y.day)

		return this.dates
	}

	/** retorna as datas especiais variáveis no ano e mês */
	private variableDates() {
		/** array de datas especiais */
		const dates: SpecialDate[] = []
		/** páscoa */
		const easter = this.calculateEaster()

		/** vetor com todas as datas especiais que dependem da data da páscoa */
		const aux: VariableSpecialDate[] = [
			{ date: sub(easter, { days: 47 }), name: 'Carnaval', type: 'PF' },
			{ date: sub(easter, { days: 46 }), name: 'Cinzas', type: 'DC' },
			{ date: sub(easter, { days: 7 }), name: 'Domingo de Ramos', type: 'DC' },
			{ date: sub(easter, { days: 3 }), name: 'Quinta-feira Santa', type: 'DC' },
			{ date: sub(easter, { days: 2 }), name: 'Sexta-feira Santa', type: 'FN' },
			{ date: sub(easter, { days: 1 }), name: 'Sábado de Aleluia', type: 'DC' },
			{ date: easter, name: 'Páscoa', type: 'DC' },
			{ date: add(easter, { days: 60 }), name: 'Corpus Christi', type: 'PF' },
		]

		aux.forEach(d => {
			const { date, type, name } = d
			const day = date.getDate()

			if (date.getMonth() === this.month)
				dates.push({ day, name, type })
		})

		if (this.month === 4) {
			let date = new Date(this.year, 4, 1) // 1º de Maio
			let sundayCount = date.getDay() === 0 ? 1 : 0

			while (sundayCount < 2) {
				date = add(date, { days: 1 })

				if (date.getDay() === 0)
					sundayCount++
			}

			dates.push({ day: date.getDate(), name: 'Dia das Mães', type: 'DC' })
		}

		if (this.month === 7) {
			let date = new Date(this.year, 7, 1) // 1º de Agosto
			let sundayCount = date.getDay() === 0 ? 1 : 0

			while (sundayCount < 2) {
				date = add(date, { days: 1 })

				if (date.getDay() === 0)
					sundayCount++
			}

			dates.push({ day: date.getDate(), name: 'Dia dos Pais', type: 'DC' })
		}

		return dates
	}

	/** calcula e retorna a data da páscoa no ano especificado */
	private calculateEaster() {
		const c = Math.floor(this.year / 100)
		const n = this.year - 19 * Math.floor(this.year / 19)
		const k = Math.floor((c - 17) / 25)

		let i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * n + 15
		i = i - 30 * Math.floor((i / 30))
		i = i - Math.floor(i / 28) * (1 - Math.floor(i / 28) *
			Math.floor(29 / (i + 1)) * Math.floor((21 - n) / 11))

		let j = this.year + Math.floor(this.year / 4) + i + 2 - c + Math.floor(c / 4)
		j = j - 7 * Math.floor(j / 7)

		const l = i - j
		const m = 3 + Math.floor((l + 40) / 44)
		const d = l + 28 - 31 * Math.floor(m / 4)

		return new Date(this.year, m - 1, d)
	}
}

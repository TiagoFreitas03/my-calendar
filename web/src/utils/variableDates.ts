import { sub, add } from 'date-fns'

import { SpecialDate, VariableSpecialDate } from '../interfaces/Date'

/**
 * retorna as datas especiais com dia e/ou mês variável
 * @param month mês
 * @param year ano
 * @returns array com as datas especiais que têm dia e/ou mês variáveis
 */
export function getVariableDates(month: number, year: number) {
	/** array de datas especiais */
	const dates: SpecialDate[] = []

	/** páscoa */
	const easter = calculateEaster(year)

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

		if (date.getMonth() === month)
			dates.push({ day, name, type })
	})

	if (month === 4) {
		let date = new Date(year, 4, 1) // 1º de Maio
		let sundayCount = date.getDay() === 0 ? 1 : 0

		while (sundayCount < 2) {
			date = add(date, { days: 1 })

			if (date.getDay() === 0)
				sundayCount++
		}

		dates.push({ day: date.getDate(), name: 'Dia das Mães', type: 'DC' })
	}

	if (month === 7) {
		let date = new Date(year, 7, 1) // 1º de Agosto
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

/**
 * calcula a data da páscoa no ano informado
 * @param year ano
 * @returns data da páscoa
 */
function calculateEaster(year: number) {
	const c = Math.floor(year / 100)
	const n = year - 19 * Math.floor(year / 19)
	const k = Math.floor((c - 17) / 25)

	let i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * n + 15
	i = i - 30 * Math.floor((i / 30))
	i = i - Math.floor(i / 28) * (1 - Math.floor(i / 28) *
		Math.floor(29 / (i + 1)) * Math.floor((21 - n) / 11))

	let j = year + Math.floor(year / 4) + i + 2 - c + Math.floor(c / 4)
	j = j - 7 * Math.floor(j / 7)

	const l = i - j
	const m = 3 + Math.floor((l + 40) / 44)
	const d = l + 28 - 31 * Math.floor(m / 4)

	return new Date(year, m - 1, d)
}

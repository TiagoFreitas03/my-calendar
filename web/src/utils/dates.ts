import { SpecialDate } from '../interfaces/Date'
import { getVariableDates } from './variableDates'

/**
 * retorna as datas especiais no mês e ano especificados
 * @param month mês
 * @param year ano
 * @returns datas especiais, feriados, celebrações e outros
 */
export function getSpecialDates(month: number, year: number) {
	/** datas especiais */
	const dates: SpecialDate[] = []

	/**
	 * adiciona um feriado ao vetor de datas especiais
	 * @param day dia do feriado
	 * @param name nome do feriado
	 */
	const addHoliday = (day: number, name: string) => dates.push({ day, name, type: 'FN' })

	/**
	 * adiciona uma data comemorativa ao vetor de datas especiais
	 * @param day dia da data comemorativa
	 * @param name nome da data comemorativa
	 */
	const addCelebration = (day: number, name: string) => dates.push({ day, name, type: 'DC' })

	/**
	 * adiciona um ponto facultativo ao vetor de datas especiais
	 * @param day dia do ponto facultativo
	 * @param name nome do ponto facultativo
	 */
	const addOther = (day: number, name: string) =>	dates.push({ day, name, type: 'PF' })

	switch (month) {
		case 0: // Janeiro
			addHoliday(1, 'Confraternização')
			addCelebration(1, 'Ano-Novo')
			break
		case 2: // Março
			addCelebration(8, 'Dia Internacional da Mulher')
			break
		case 3: // Abril
			addHoliday(21, 'Tiradentes')
			addCelebration(19, 'Dia do Índio')
			addCelebration(22, 'Descobrimento do Brasil')
			break
		case 4: // Maio
			addHoliday(1, 'Dia do Trabalho')
			break
		case 5: // Junho
			addCelebration(12, 'Dia dos Namorados')
			addCelebration(24, 'Dia de São João')
			break
		case 6: // Julho
			addCelebration(9, 'Dia da Revolução Constitucionalista')
			addCelebration(20, 'Dia do Amigo e Internacional da Amizade')
			break
		case 7: // Agosto
			addCelebration(22, 'Dia do Folclore')
			addCelebration(25, 'Dia do Soldado')
			break
		case 8: // Setembro
			addHoliday(7, 'Independência do Brasil')
			addCelebration(21, 'Dia da Árvore')
			break
		case 9: // Outubro
			addHoliday(12, 'Nossa Senhora Aparecida')
			addCelebration(12, 'Dia das Crianças')
			addCelebration(15, 'Dia do Professor')
			addCelebration(31, 'Dia das Bruxas (Halloween)')
			addCelebration(31, 'Dia do Saci')
			addOther(28, 'Dia do Servidor Público')
			break
		case 10: // Novembro
			addHoliday(2, 'Finados')
			addHoliday(15, 'Proclamação da República')
			addCelebration(1, 'Dia de Todos os Santos')
			addCelebration(19, 'Dia da Bandeira')
			addCelebration(20, 'Dia Nacional da Consciência Negra')
			break
		case 11: // Dezembro
			addHoliday(25, 'Natal')
			addCelebration(24, 'Véspera de Natal')
			addCelebration(31, 'Véspera de Ano-Novo')
			break
	}

	/** datas especiais com dia/mês variável */
	const variableDates = getVariableDates(month, year)
	dates.push(...variableDates)
	dates.sort((x, y) => x.day - y.day)

	return {
		dates,
		holidays: dates.filter(d => d.type === 'FN').map(d => d.day),
		celebrations: dates.filter(d => d.type === 'DC').map(d => d.day),
		others: dates.filter(d => d.type === 'PF').map(d => d.day),
	}
}

/**
 * verifica se o dia, mês e ano passados por parâmetro formam a data atual
 * @param day dia
 * @param month mês
 * @param day dia
 */
export function isToday(day: number, month: number, year: number) {
	const today = new Date()
	const [d, m, y] = [today.getDate(), today.getMonth(), today.getFullYear()]

	return day === d && month === m && year === y
}

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

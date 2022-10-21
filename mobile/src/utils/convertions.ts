/**
 * converte uma variável para número, ou retorna um valor padrão
 * @param variable variável que será convertida para número
 * @param defaultValue valor padrão de retorno, caso variable não seja um número
 */
 export function toNumber(variable: any, defaultValue: number) {
	if (isNaN(variable))
		return defaultValue

	return Number(variable)
}

/**
 * converte texto no formato YYYY-MM-DD para data
 * @param text texto no formato YYYY-MM-DD
 * @returns texto convertido em data
 */
export function toDate(text: string) {
	const [year, month, day] = text.split('-').map(x => Number(x))

	const date = new Date(year, month - 1, day)

	return date
}

/**
 * converte data no formato DD/MM/YYYY para o formato YYYY-MM-DD
 * @param date data no formato DD/MM/YYYY
 */
export function convertDateFormat(date: string) {
	if (!(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/).test(date))
		return date

	const parts = date.split('/')

	return parts.reverse().join('-')
}

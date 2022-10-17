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

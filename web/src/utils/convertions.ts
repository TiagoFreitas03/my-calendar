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

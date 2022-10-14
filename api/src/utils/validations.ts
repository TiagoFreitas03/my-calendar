/**
 * verifica se a string é uma data válida, no formato YYYY-MM-DD
 * @param date data para ser validada
 */
function isDateValid(date: string) {
	if (!date || !(/^\d{4}-\d{1,2}-\d{1,2}$/).test(date))
		return false

	const [year, month, day] = date.split('-').map(t => Number(t))

	if (year < 1000 || year > 3000 || month == 0 || month > 12)
		return false

	var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
		monthLength[1] = 29

	return day > 0 && day <= monthLength[month - 1]
}

/**
 * verifica se a string é uma data e hora válida, no formato YYYY-MM-DD HH:MM
 * @param datetime data e hora para serem validadas
 */
function isDateTime(datetime: string) {
	if (!datetime || !(/^(\d{4}-\d{1,2}-\d{1,2}) ([01]?[0-9]|2[0-3]):[0-5][0-9]$/).test(datetime))
		return false

	const [date] = datetime.split(' ')

	return isDateValid(date)
}

/**
 * verifica se um array tem elementos repetidos
 * @param array array que será verificado
 */
function hasDuplicates<T>(array: Array<T>) {
	return (new Set(array).size != array.length)
}

export { isDateValid, isDateTime, hasDuplicates }

/** Formato de data */
type TDateFormats =
	'string' |  // data escrita por extendo: "dia de mês de ano"
	'YYYY-MM-DD' // data no formato "ano/mês/dia"

/**
 * preenche número com zeros à esquerda e retorna uma string
 * @param num número para formatar
 * @param maxLength quantidade máxima de zeros
 */
const zeroFill = (num: number, maxLength: number = 2) => num.toString().padStart(maxLength, '0')

function stringToDate(text: string, time?: string) {
	const parts = text.split('-').map(x => Number(x))

	const [year, month, day] = parts

	let [hours, minutes] = [0, 0]

	if (time)
		[hours, minutes] = time.split(':').map(x => Number(x))

	const date = new Date(year, month - 1, day, hours, minutes, 0, 0)

	return date
}

/**
 * converte data para string no formato especificado
 * @param date data que será convertida
 * @param format formato da data (padrão = string)
 */
function dateToString(date: Date, format: TDateFormats = 'string') {
	/** Meses do ano */
	const MONTHS = [
		'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
		'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
	]

	const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()]

	if (format === 'YYYY-MM-DD')
		return `${year}-${zeroFill(month + 1)}-${zeroFill(day)}`

	return `${day} ${MONTHS[month]} ${year}`
}

export { stringToDate, dateToString }

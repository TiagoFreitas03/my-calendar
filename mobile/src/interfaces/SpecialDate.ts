/** tipos de datas "especiais" */
type SpecialDateTypes =
	'FN' | // feriado nacional
	'DC' | // data comemorativa
	'PF'   // ponto facultativo

/** propriedades da data especial com dia e mês fixo */
interface SpecialDate {
	/** número do dia */
	day: number

	/** nome da data especial */
	name: string

	/** tipo de data especial */
	type: SpecialDateTypes
}

/** propriedades das datas especiais */
interface SpecialDates {
	/** datas especiais */
	dates: SpecialDate[]

	/** dias dos feriados */
	holidays: number[]

	/** dias das datas comemorativas */
	celebrations: number[]

	/** dias dos pontos facultativos */
	others: number[]
}

/** propriedades para busca de datas/eventos por mês e ano */
interface Reference {
	/** ano */
	year: number

	/** mês */
	month: number
}

export { SpecialDate, SpecialDates, Reference }

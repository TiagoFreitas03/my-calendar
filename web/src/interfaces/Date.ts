/** tipos de datas "especiais" */
type SpecialDateTypes =
	'FN' | // feriado nacional
	'DC' | // data comemorativa
	'PF'   // ponto facultativo

/** propriedades comunns de datas especiais */
interface IDate {
	/** nome da data especial */
	name: string

	/** tipo de data especial */
	type: SpecialDateTypes
}

/** propriedades da data especial com dia e mês fixo */
export interface SpecialDate extends IDate {
	/** número do dia */
	day: number
}

/** propriedades da data especial com dia e/ou mês variável */
export interface VariableSpecialDate extends IDate {
	/** dia, mês e ano da data especial */
	date: Date
}

/** propriedades para busca de datas/eventos por mês e ano */
export interface Reference {
	/** ano */
	year: number

	/** mês */
	month: number
}

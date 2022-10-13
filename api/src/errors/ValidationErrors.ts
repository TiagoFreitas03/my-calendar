/** interface para tratar erros de validação causados pelo yup */
export interface ValidationErrors {
	/** a chave define o nome da propriedade, que recebe um vetor de strings */
	[chave: string]: string[]
}

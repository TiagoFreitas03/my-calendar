/** erros gerais da API */
export class ApiError {
	/** mensagem do erro */
	public readonly message: string

	/** código de status HTTP do erro. O padrão é 400 (Bad request)	*/
	public readonly status: number

	/**
	 * @constructor
	 * @param message mensagem de erro
	 * @param status código de status HTTP (default = 400)
	 */
	constructor(message: string, status: number = 400) {
		this.message = message
		this.status = status
	}
}

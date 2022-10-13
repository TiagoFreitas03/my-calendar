/** erros de entidade não encontrada no banco de dados */
export class EntityNotFoundError {
	/** model da entidade não encontrada */
	public readonly model: string

	/** filtros utlizados na busca */
	public readonly filters: any

	/**
	 * @constructor
	 * @param model model da entidade não encontrada
	 * @param filtros filtros utilizados na busca
	 */
	constructor(model: string, filters?: any) {
		this.model = model
		this.filters = filters
	}
}

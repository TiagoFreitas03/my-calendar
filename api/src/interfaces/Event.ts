/** campos gerais do evento */
interface EventBase {
	/** nome do evento */
	name: string

	/** descrição do evento */
	description: string | null

	/** id do usuário dono do evento */
	user_id: string
}

/** filtros para pesquisa de eventos por nome */
interface EventSearchFilters {
	/** nome do evento */
	name?: string

	/** id do usuário criador do evento */
	user_id: string

	/** limite de registros por página */
	limit: number

	/** número da página */
	page: number
}

/** propriedades para buscar eventos por período de referência */
interface EventReferenceFilters {
	/** mês do período de referência */
	month: number

	/** ano do período de referência */
	year: number

	/** id do usuário buscando eventos */
	user_id: string
}

export { EventBase, EventSearchFilters, EventReferenceFilters }

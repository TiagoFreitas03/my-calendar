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

/** dados da label do event */
interface EventLabel {
	label_id: number
}

export { EventBase, EventSearchFilters, EventLabel }

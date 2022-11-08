/** tipagem com parâmetros para as rotas */
export type StackParamList = {
	/** menu lateral */
	drawer: undefined

	/** tela inicial */
	home: undefined

	/** tela de login */
	login: undefined

	/** tela de cadastro de usuário */
	register: undefined

	/** tela de logout */
	logout: undefined

	/** tela de cadastro de evento */
	create_event: undefined

	/** tela de edição de evento */
	update_event: {
		/** id do evento que será editado */
		id: string
	}

	/** tela dos próximos eventos */
	next_events: undefined

	/** tela de detalhe do evento */
	event_details: {
		/** id do evento que será detalhado */
		id: string
	}
}

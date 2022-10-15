/** informações do usuário vindas da API */
export interface User {
	/** id */
	id: string

	/** nome */
	name: string

	/** e-mail */
	email: string

	/** data de nascimento */
	birth_date?: string

	/** url da foto de perfil */
	picture?: string

	/** data de cadastro */
	created_at: string
}

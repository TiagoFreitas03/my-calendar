import { SpecialDate } from "../interfaces/Date"

/** datas especiais separadas por mês */
export const specialDates: SpecialDate[][] = [
	// Janeiro
	[
		{ day: 1, name: 'Confraternização', type: 'FN' },
		{ day: 1, name: 'Ano-Novo', type: 'DC' }
	],
	// Fevereiro
	[],
	// Março
	[
		{ day: 8, name: 'Dia Internacional da Mulher', type: 'DC' }
	],
	// Abril
	[
		{ day: 21, name: 'Tiradentes', type: 'FN' },
		{ day: 19, name: 'Dia do Índio', type: 'DC' },
		{ day: 22, name: 'Descobrimento do Brasil', type: 'DC' },
	],
	// Maio
	[
		{ day: 1, name: 'Dia do Trabalho', type: 'FN' }
	],
	// Junho
	[
		{ day: 12, name: 'Dia dos Namorados', type: 'DC' },
		{ day: 24, name: 'Dia de São João', type: 'DC' }
	],
	// Julho
	[
		{ day: 9, name: 'Dia da Revolução Constitucionalista', type: 'DC' },
		{ day: 20, name: 'Dia do Amigo e Internacional da Amizade', type: 'DC' }
	],
	// Agosto
	[
		{ day: 22, name: 'Dia do Folclore', type: 'DC' },
		{ day: 25, name: 'Dia do Soldado', type: 'DC' }
	],
	// Setembro
	[
		{ day: 7, name: 'Independência do Brasil', type: 'FN' },
		{ day: 21, name: 'Dia da Árvore', type: 'DC' },
	],
	// Outubro
	[
		{ day: 12, name: 'Nossa Senhora Aparecida', type: 'FN' },
		{ day: 12, name: 'Dia das Crianças', type: 'DC' },
		{ day: 15, name: 'Dia do Professor', type: 'DC' },
		{ day: 31, name: 'Dia das Bruxas (Halloween)', type: 'DC' },
		{ day: 31, name: 'Dia do Saci', type: 'DC' },
		{ day: 28, name: 'Dia do Servidor Público', type: 'PF' }
	],
	// Novembro
	[
		{ day: 2, name: 'Finados', type: 'FN' },
		{ day: 15, name: 'Proclamação da República', type: 'FN' },
		{ day: 1, name: 'Dia de Todos os Santos', type: 'DC' },
		{ day: 19, name: 'Dia da Bandeira', type: 'DC' },
		{ day: 20, name: 'Dia Nacional da Consciência Negra', type: 'DC' }
	],
	// Dezembro
	[
		{ day: 25, name: 'Natal', type: 'FN' },
		{ day: 24, name: 'Véspera de Natal', type: 'DC' },
		{ day: 31, name: 'Véspera de Ano-Novo', type: 'DC' }
	],
]

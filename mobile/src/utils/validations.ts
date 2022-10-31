/**
 * Verifica se o texto é um código de cor hexadecimal válido
 * @param text texto que será validado
 * @returns retorna se text é um código hexadecimal válido para cores
 */
export function isValidHexCode(text: string) {
	return (/^#[0-9A-F]{6}$/i).test(text)
}

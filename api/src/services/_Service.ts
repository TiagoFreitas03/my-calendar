/** service base */
export abstract class Service<T> {
	/** repositório para manipulação da tabela no banco de dados */
	protected repository: T

	/**
	 * instancia o service e o repositório
	 * @param Repository classe do repositório
	 */
	constructor(Repository: { new (): T }) {
		this.repository = new Repository()
	}
}

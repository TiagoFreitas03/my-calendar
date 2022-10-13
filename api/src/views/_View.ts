/** view base */
export abstract class View<T, U> {
	/** método para "renderizar" um model */
	abstract render(object: T): U

	/** método para "renderizar" vários models */
	renderMany(objects: T[]): U[] {
		return objects.map(object => this.render(object))
	}
}

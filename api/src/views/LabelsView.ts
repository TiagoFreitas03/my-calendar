import { Label as LabelModel } from '@prisma/client'

import { View } from './_View'

/** campos retornados pela view */
interface LabelView {
	id: number
	name: string
	color: string
}

/** view de labels */
export class LabelsView extends View<LabelModel, LabelView> {
	render(label: LabelModel) {
		const { id, name, color } = label

		return {
			id,
			name,
			color: `#${color.toUpperCase()}`
		}
	}
}

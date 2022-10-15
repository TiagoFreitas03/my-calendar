import { Label } from '../interfaces/Label'

/** propriedades do container de labels */
interface LabelsProps {
	/** vetor de labels */
	data: Label[]

	/** indica se o botão de remoção deve ser exibido */
	showRemoveButton?: boolean

	/** evento de remoção da label */
	onRemove?: (id: number) => void
}

/** container para as labels do evento */
export function Labels({ data, showRemoveButton, onRemove: remove }: LabelsProps) {
	return (
		<div className='flex flex-row gap-4 my-4'>
			{ data.map(label => {
				return (
					<span
						key={label.id}
						style={{ border: `2px solid ${label.color}` }}
						className="px-4 py-2 rounded-lg"
					>
						{label.name}

						{ showRemoveButton &&
							<span
								className='cursor-pointer ml-2 mr-0 text-gray-300 text-lg'
								onClick={() => {
									if (remove)
										remove(label.id)
								}}
							>
								&times;
							</span>
						}
					</span>
				)
			}) }
		</div>
	)
}

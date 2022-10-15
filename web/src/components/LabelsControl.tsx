import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Label } from '../interfaces/Label'
import { LabelsController } from '../controllers/LabelsController'
import { Labels } from './Labels'

/** propriedades do controle de labels */
interface LabelsControlProps {
	/** evento de mudança das labels */
	onChange: (labels: Label[]) => void
}

/** controle de etiquetas de um evento */
export function LabelsControl({ onChange: updateLabels }: LabelsControlProps) {
	const [name, setName] = useState('')
	const [labels, setLabels] = useState<Label[]>([])
	const [selected, setSelected] = useState<Label[]>([])

	useEffect(() => {
		new LabelsController().search(name).then(data => setLabels(data))
	}, [name])

	useEffect(() => {
		updateLabels(selected)
	}, [selected])

	/** adiciona uma etiqueta ao vetor */
	const addLabel = (label: Label) => {
		setName('')

		const { id } = label

		if (selected.filter(s => s.id === id).length === 0)
			setSelected([...selected, label])
	}

	/** remove uma etiqueta do vetor */
	const remove = (id: number) => {
		const aux = selected.slice()

		for (let index = 0; index < aux.length; index++)
			if (aux[index].id === id) {
				aux.splice(index, 1)
				break
			}

		setSelected(aux)
	}

	return (
		<div className="mb-2">
			<label className="block mb-2">Etiquetas</label>

			<input
				className="border rounded w-full py-2 px-3 mb-1 text-gray-900 bg-white"
				type='text'
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder='Pesquise pelo nome da etiqueta...'
			/>

			{name !== '' &&
			<div
				className='relative flex gap-2 bg-gray-900 m-0 rounded-md p-3 border border-gray-500'
			>
				{labels.length > 0 ?
					labels.map(label => {
						return (
							<span
								key={label.id}
								className="px-4 py-2 rounded-lg cursor-pointer"
								style={{ border: `1px solid ${label.color}` }}
								onClick={() => addLabel(label)}
							>
								{label.name}
							</span>
						)
					}) :
					<>
						<p>
							Nenhuma etiqueta encontrada.
							Clique <Link to='/create_label' className='text-blue-500' target='_blank'>
								aqui
							</Link> para cadastrar.
						</p>
					</>
				}
			</div>}

			{selected.length > 0 ?
				<Labels data={selected} onRemove={(id) => remove(id)} showRemoveButton={true} /> :
				<p className='mt-2 mb-4 text-gray-300'>Nenhuma etiqueta selecionada.</p>
			}
		</div>
	)
}

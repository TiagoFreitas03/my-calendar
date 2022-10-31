import { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { Label } from "../interfaces/Label"
import { LabelsController } from '../controllers/LabelsController'
import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'
import { Labels } from './Labels'
import { Input } from './Input'

/** propriedades do controle de labels */
interface LabelsControlProps {
	/** evento de mudança das labels */
	onChange: (labels: Label[]) => void
}

/** controle de etiquetas de um evento */
export function LabelsControl({ onChange }: LabelsControlProps) {
	const [name, setName] = useState('')
	const [labels, setLabels] = useState<Label[]>([])
	const [selected, setSelected] = useState<Label[]>([])

	useEffect(() => {
		new LabelsController().search(name).then(data => setLabels(data))
	}, [name])

	useEffect(() => {
		onChange(selected)
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
		<View style={styles.container}>
			<Text style={styles.title}>Etiquetas</Text>

			<Input value={name} onChangeText={setName} placeholder='Pesquise pelo nome da etiqueta' />

			{
				name !== '' &&
				<View style={styles.searchResults}>
					{
						labels.length > 0 ?
							labels.map(label => (
								<Text
									key={label.id}
									style={[styles.text, styles.label, { borderColor: label.color }]}
									onPress={() => addLabel(label)}
								>
									{label.name}
								</Text>
							)) :
							<Text style={styles.text}>Nenhuma etiqueta encontrada.</Text>
					}
				</View>
			}

			{
				selected.length > 0 ?
					<Labels data={selected} onRemove={id => remove(id)} showRemoveButton /> :
					<Text style={styles.text}>Nenhuma etiqueta selecionada.</Text>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 4,
		paddingBottom: 12,
	},

	title: {
		color: COLORS.GRAY_100,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.MD
	},

	searchResults: {
		marginBottom: 16,
		padding: 8,
		marginTop: -8,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: COLORS.GRAY_500,
	},

	label: {
		marginRight: 8,
		borderWidth: 1,
		borderRadius: 16,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginBottom: 8,
		textAlign: 'center'
	},

	text: {
		color: COLORS.GRAY_100,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.SM
	},

	link: {
		color: COLORS.BLUE_500
	}
})

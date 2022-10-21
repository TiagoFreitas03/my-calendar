import { Dimensions, StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import * as ImagePicker from 'expo-image-picker'

import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme'
import { Label } from './Label'

/** propriedades do input de arquivo */
interface ImageInputProps {
	/** título do input */
	label?: string

	/** nome do arquivo selecionado */
	filename: string

	/** evento de seleção da imagem */
	onSelect: (image: string) => void

	/** evento de "limpeza" da imagem selecionada */
	onClear: () => void
}

export function ImageInput({ label, filename, onSelect, onClear }: ImageInputProps) {
	async function handleSelectImage() {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

		if (status !== 'granted')
			return alert('Eita! Precisamos de acesso às suas fotos...')

		const result = await ImagePicker.launchImageLibraryAsync({
			quality: 1, mediaTypes: ImagePicker.MediaTypeOptions.Images
		})

		if (result.cancelled)
			return

		onSelect(result.uri)
	}

	return (
		<View style={styles.container}>
			{ label && <Label title={label} /> }

			{
				filename === '' ? (
					<TouchableOpacity style={styles.imageInput} onPress={handleSelectImage} activeOpacity={0.75}>
						<Icon name='plus' size={32} color={COLORS.BLUE_500} />
					</TouchableOpacity>
				) :
				(
					<View style={styles.fileContainer}>
						<Image source={{ uri: filename }} style={styles.selectedFile} />

						<TouchableOpacity onPress={onClear} activeOpacity={0.75}>
							<Icon name='x' color={COLORS.PINK_500} size={32} />
						</TouchableOpacity>
					</View>
				)
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 12
	},

	imageInput: {
		width: Dimensions.get('window').width - 50,
		borderWidth: 1,
		borderColor: COLORS.BLUE_500,
		borderRadius: 8,
		alignItems: 'center',
		padding: 12
	},

	filename: {
		color: COLORS.GRAY_100,
		fontSize: FONT_SIZE.SM,
		fontFamily: FONT_FAMILY.REGULAR,
		marginTop: 4,
	},

	fileContainer: {
		width: Dimensions.get('window').width - 50,
		flexDirection: 'row',
		alignItems: 'center'
	},

	selectedFile: {
		width: 96,
		height: 96,
		borderRadius: 4,
	},
})

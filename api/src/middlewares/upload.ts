import multer from 'multer'
import path from 'path'

/** middleware para upload de imagem */
export const upload = multer({
	storage: multer.diskStorage({
		destination: path.join(__dirname, '..', '..', 'uploads'),
		filename: (_, file, cb) => {
			const randomNumber = Math.floor(Math.random() * 100)

			cb(null, `${Date.now()}-${randomNumber}-${file.originalname}`)
		},
	}),
	limits: {
		fileSize: 4 * 1024 * 1024, // 4MB
	},
	fileFilter: (req, file, cb) => {
		if (!['image/jpeg', 'image/png'].includes(file.mimetype))
			return cb(null, false)

		cb(null, true)
	}
})

import 'dotenv/config'
import { User as UserModel } from '@prisma/client'

import { View } from './_View'
import { dateToString } from '../utils/convertions'

interface UserView {
	id: string
	name: string
	email: string
	birth_date: string | undefined
	picture: string | undefined
	created_at: string
}

export class UsersView extends View<UserModel, UserView> {
	render(user: UserModel) {
		const { id, name, email, birth_date, picture, created_at } = user

		return {
			id,
			name,
			email,
			birth_date: birth_date ? dateToString(birth_date) : undefined,
			picture: picture ? `${process.env.UPLOADS}/${picture}` : undefined,
			created_at: dateToString(created_at)
		}
	}
}

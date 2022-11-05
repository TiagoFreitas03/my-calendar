import { RootStackParamList } from './index.routes'

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

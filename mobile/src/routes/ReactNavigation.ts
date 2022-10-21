import { DrawerStackParamList } from './drawer.routes'

declare global {
	namespace ReactNavigation {
		interface RootParamList extends DrawerStackParamList {}
	}
}

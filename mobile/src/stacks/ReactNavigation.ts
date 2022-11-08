import { StackParamList } from './StackParamList'

declare global {
	namespace ReactNavigation {
		interface RootParamList extends StackParamList {}
	}
}

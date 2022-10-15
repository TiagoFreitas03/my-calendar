import { Outlet, Navigate } from 'react-router-dom'

import { RouteProps } from "../interfaces/Route"

/** container para rotas privadas (acessadas somente por usuários logados) */
export function PrivateRoutes({ signed }: RouteProps) {
	return signed ?
		<Outlet /> :
		<Navigate to='/login' replace />
}

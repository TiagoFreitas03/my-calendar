import { Outlet, Navigate } from 'react-router-dom'

import { RouteProps } from "../interfaces/Route"

/** container para rotas públicas (acessadas somente por usuários não logados) */
export function PublicRoutes({ signed }: RouteProps) {
	return signed ?
		<Navigate to='/' replace /> :
		<Outlet />
}

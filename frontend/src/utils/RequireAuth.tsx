import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { adminLoginRoute, adminRoute } from './constants';
import { checkAuthenticated } from './help-funcs';


export const RequireAuth = ({children}: {children: ReactNode}) => {
	const isAuth = checkAuthenticated();

	if (!isAuth) {
		return <Navigate to={adminRoute+adminLoginRoute} replace/>;
	}

	return children;
};
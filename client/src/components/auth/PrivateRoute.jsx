import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth-helper';

const PrivateRoute = ({ children, adminOnly = false }) => {
	const auth = isAuthenticated();

	if (!auth) {
		return <Navigate to="/signin" replace />;
	}

	if (adminOnly && auth.data?.role !== 'Admin') {
		return <Navigate to="/projects/list" replace />;
	}

	return children;
};

export default PrivateRoute;

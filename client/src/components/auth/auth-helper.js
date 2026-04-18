const API_URL = import.meta.env.VITE_APP_APIURL;
const AUTH_ENDPOINT = `${API_URL}/api/auth`;
const AUTH_STORAGE_KEY = 'jwt';

export const signup = async (user) => {
	try {
		const response = await fetch(`${AUTH_ENDPOINT}/signup`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		return await response.json();
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: 'Unable to sign up right now.'
		};
	}
};

export const signin = async (user) => {
	try {
		const response = await fetch(`${AUTH_ENDPOINT}/signin`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});

		return await response.json();
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: 'Unable to sign in right now.'
		};
	}
};

export const authenticate = (authPayload, callback) => {
	if (typeof window === 'undefined') {
		return;
	}

	localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authPayload));

	if (callback) {
		callback();
	}
};

export const signout = (callback) => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(AUTH_STORAGE_KEY);
	}

	if (callback) {
		callback();
	}
};

export const isAuthenticated = () => {
	if (typeof window === 'undefined') {
		return false;
	}

	const authData = localStorage.getItem(AUTH_STORAGE_KEY);
	if (!authData) {
		return false;
	}

	try {
		return JSON.parse(authData);
	} catch (error) {
		localStorage.removeItem(AUTH_STORAGE_KEY);
		return false;
	}
};

export const getToken = () => {
	const auth = isAuthenticated();
	return auth && auth.token ? auth.token : null;
};

export const isAdmin = () => {
	const auth = isAuthenticated();
	return Boolean(auth && auth.data && auth.data.role === 'Admin');
};

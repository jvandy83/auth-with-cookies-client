import { useEffect, useContext, createContext, useState } from 'react';

import { useHistory } from 'react-router-dom';

import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const history = useHistory();
	const initialAuthState = {
		user: null,
		isAuthenticated: false,
		token: null,
	};
	const [auth, setAuthState] = useState(initialAuthState);

	// ***** AXIOS INTERCEPTORS ****** //

	axios.interceptors.request.use(
		function (config) {
			console.log('REQUEST CONFIG INTERCEPTOR: ', config);
			// config.headers.Authorization = auth?.token ? `Bearer ${auth.token}` : '';
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		},
	);

	// Add a response interceptor
	axios.interceptors.response.use(
		(response) => {
			return response;
		},
		function (error) {
			// const originalRequest = error.config;
			// if (error.response.status === 401 && !originalRequest._retry) {
			// 	// originalRequest._retry = true;
			// 	return axios.get('/refresh-token').then((res) => {
			// 		if (res.status === 201) {
			// 			// 1) put token to LocalStorage
			// 			setAuthState((prev) => ({
			// 				...prev,
			// 				token: res.data.token,
			// 				user: res.data.user,
			// 			}));
			// 			// 2) Change Authorization header
			// 			axios.defaults.headers.common['Authorization'] =
			// 				'Bearer ' + auth?.token;
			// 			if (
			// 				error.response.status === 401 &&
			// 				originalRequest.url === 'http://localhost:5000/refresh-token'
			// 			) {
			// 				history.push('/login');
			// 				return Promise.reject(error);
			// 			}
			// 			// 3) return originalRequest object with Axios.
			// 			return axios(originalRequest);
			// 		}
			// 	});
			// }
		},
	);
	// ***** AXIOS INTERCEPTORS ****** //

	const login = async (data) => {
		try {
			const res = await axios.post('/login', data);
			if (res.status !== 200 && res.status !== 201) {
				console.log('Unable to log in');
			}
			setAuthState((prev) => ({
				...prev,
				user: res.data.user,
				isAuthenticated: true,
				token: res.data.token,
			}));

			history.push('/profile');
		} catch (error) {
			console.log(error);
		}
	};
	const signup = async (data) => {
		const res = await axios.post('/signup', data);
		if (res.status === 200) {
			history.push('/login');
		}
	};

	const addProfile = async (data) => {
		try {
			console.log(auth.token);
			const res = await axios.post('/add-profile', data, {
				headers: {
					Authorization: `Bearer ${auth?.token}`,
				},
			});
			if (res.status !== 200 && res.status !== 201) {
				console.log('Could not add user profile information');
			}
			setAuthState((prev) => ({
				...prev,
				user: res.data.user,
			}));
		} catch (err) {
			console.log(err);
		}
	};

	const logout = () => {
		setAuthState((prev) => ({
			...prev,
			isAuthenticated: false,
			user: null,
		}));
	};

	useEffect(() => {
		(async () => {
			try {
				const res = await axios('/refresh-token', {
					headers: {
						withCredentials: true,
					},
				});
				if (res.status !== 200 && res.status !== 201) {
					console.log('User is logged out');
				}
				setAuthState((prev) => ({
					...prev,
					user: res.data.user,
					isAuthenticated: res.data.isAuthenticated,
					token: res.data.token,
				}));
			} catch (error) {
				console.log(error);
			}
		})();
	}, [auth.token]);

	return (
		<AuthContext.Provider value={{ login, logout, signup, auth, addProfile }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used insid AuthProvider');
	}
	return context;
};

export { AuthProvider, useAuth };

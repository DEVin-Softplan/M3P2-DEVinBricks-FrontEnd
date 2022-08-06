import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState('');
	const [user, setUser] = useState('');
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		const tokenStorage = localStorage.getItem('token');
		if (tokenStorage) {
			setToken(tokenStorage);
			const parser = JSON.parse(atob(tokenStorage.split('.')[1]));
			setUser(parser.name);
			setAuth(true);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ token, setToken, user, setUser, auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

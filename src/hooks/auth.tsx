import React, { useCallback, useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { UserDTO } from '../dtos/UserDTO';
import apiFake from '../services/apiFake';

interface Credentials {
	username: string;
	password: string;
}

interface AuthContextData {
	user: UserDTO;
	signIn: (user: Credentials) => Promise<void>;
	signOut: () => void;
	isAuth: boolean;
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = React.useState<UserDTO>(() => {
		const storagedUser = localStorage.getItem('@elogroup-leads:user');
		if (storagedUser) {
			return JSON.parse(storagedUser);
		}
		return {} as UserDTO;
	});

	const signIn = useCallback(
		async (credentials: Credentials): Promise<void> => {
			const res = await apiFake.signIn(credentials);

			const user = res.data;
			localStorage.setItem('@elogroup-leads:user', JSON.stringify(user));
			setUser(user as UserDTO);
		},
		[]
	);

	const signOut = useCallback((): void => {
		setUser({} as UserDTO);
		console.log(user);
		localStorage.removeItem('@elogroup-leads:user');
	}, []);

	return (
		<AuthContext.Provider value={{ user, signIn, signOut, isAuth: !!user.id }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	if (!context) throw new Error('useAuth must be used within an AuthProvider');

	return context;
}

function RequireAuth({ children }: { children: JSX.Element }) {
	const { isAuth } = useAuth();
	const location = useLocation();

	if (!isAuth) {
		return <Navigate to='/sign-in' state={{ from: location }} replace />;
	}

	return children;
}

function RedirectAuth({ children }: { children: JSX.Element }) {
	const { isAuth } = useAuth();
	const location = useLocation();

	if (isAuth) {
		return <Navigate to='/home' state={{ from: location }} replace />;
	}

	return children;
}

export { AuthProvider, RequireAuth, useAuth, RedirectAuth };

import { UserDTO } from '../dtos/UserDTO';
import { HttpRequestError } from '../utils/customErrors';

interface AuthResponse {
	data: Partial<UserDTO> | null;
}

function timeout(ms: number = 2000) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class apiFake {
	static async signUp(user: UserDTO): Promise<AuthResponse> {
		const res = localStorage.getItem('@elogroup-leads:users');
		if (res) {
			const users: UserDTO[] = JSON.parse(res);
			const userExists = users.filter(
				(item) => item.username === user.username
			);

			if (userExists[0]) {
				await timeout(700);
				throw new HttpRequestError(
					409,
					'Já existe um registro com o nome de usuário informado'
				);
			}
			localStorage.setItem(
				'@elogroup-leads:users',
				JSON.stringify([...users, user])
			);
			await timeout(700);
			return { data: user };
		}
		localStorage.setItem('@elogroup-leads:users', JSON.stringify([user]));
		await timeout(700);
		return { data: user };
	}

	static async signIn(
		credentials: Partial<UserDTO>
	): Promise<Omit<AuthResponse, 'password'>> {
		const res = localStorage.getItem('@elogroup-leads:users');

		if (res) {
			const users: UserDTO[] = JSON.parse(res);
			const userExists = users.filter(
				(item) => item.username === credentials.username
			);

			if (userExists[0]) {
				const user = userExists[0];
				if (user.password === credentials.password) {
					await timeout();
					const resUser: Omit<UserDTO, 'password'> = {
						id: user.id,
						username: user.username,
						createdAt: user.createdAt,
					};
					return { data: resUser };
				}
				await timeout(700);
				throw new HttpRequestError(401, 'Usuário e/ou senha inválidos');
			} else {
				await timeout(700);
				throw new HttpRequestError(
					404,
					'Não existe registro para o nome de usuário informado'
				);
			}
		} else {
			await timeout(700);
			throw new HttpRequestError(404, 'Não há usuários cadastrados');
		}
	}

	// static async signOut(): Promise<void> {
	// ...revokeToken code
	// }
}

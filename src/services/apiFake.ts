import { UserDTO } from '../dtos/UserDTO';

export default class apiFake {
	static signUp(user: UserDTO): UserDTO {
		localStorage.setItem('@elogroup-leads:users', JSON.stringify(user));
		return user;
	}

	static signIn(credentials: Partial<UserDTO>): UserDTO | null {
		const users = localStorage.getItem('@elogroup-leads:users');

		if (users) {
			const loggedUser = JSON.parse(users);
			return loggedUser as UserDTO;
		}
		return null;
	}
}

export class Storage {
	static setUser(user: Object) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	static getUser() {
		return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
	}

	static clearStorage() {
		localStorage.clear();
	}
}

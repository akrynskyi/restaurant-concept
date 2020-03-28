class LocalStorage {
	setUser(user: Object) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	getUser() {
		return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
	}
}

export const storage = new LocalStorage();

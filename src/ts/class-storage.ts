export class Storage {
	static setUser(user: Object) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	static getUser() {
		return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
	}

	static setCurrentPage(page: number) {
		localStorage.setItem('page', page.toString());
	}

	static getCurrentPage(): number {
		return parseInt(localStorage.getItem('page'), 10);
	}

	static clearStorage() {
		localStorage.clear();
	}
}

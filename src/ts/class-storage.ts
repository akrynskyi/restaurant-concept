export class Storage {
	static setUser(user: Object) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	static getUser() {
		return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
	}

	static setCurrentPage(page: number) {
		localStorage.setItem('page', page.toString());
	}

	static getCurrentPage(): number {
		return parseInt(localStorage.getItem('page'), 10);
	}

	static removeItem(item: string) {
		localStorage.removeItem(item);
	}

	static clearStorage() {
		localStorage.clear();
	}
}

export const DOM_ELEMENTS = {
	// Header

	header: document.querySelector('.header'),
	searchBar: document.querySelector('.search-bar'),
	searchButton: document.getElementById('searchBtn'),
	hero: document.querySelector('.hero'),
	heroHeader: document.getElementById('heroHeader'),
	heroBlock: document.getElementById('heroBlock'),

	// User

	userNav: document.getElementById('userNav'),
	userNavButton: document.getElementById('userNavBtn'),
	userNavDropdown: document.querySelector('.dropdown-menu'),
	userName: document.getElementById('userName'),
	userletter: document.getElementById('userLetter'),
	userPicture: document.getElementById('userPicture'),
	authBlock: document.getElementById('auth'),

	// Signup

	signUpButton: document.getElementById('signUpBtn'),
	overlaySignUp: document.getElementById('overlayForSignUp'),
	modalSignUp: document.getElementById('modalSignUp'),
	formSignUp: document.getElementById('signUpForm'),

	// Signin

	signInButton: document.getElementById('signInBtn'),
	signInRedirectBtns: document.querySelectorAll('[data-action="signin"]'),
	overlaySignIn: document.getElementById('overlayForSignIn'),
	modalSignIn: document.getElementById('modalSignIn'),
	formSignIn: document.getElementById('signInForm'),
	modalResetPass: document.getElementById('modalResetPass'),

	// Sign out

	signOutBtn: document.getElementById('signOutBtn'),
};


class UI {
	// ---- MODAL LOGIC ----

	// On click
	showModalOnClick(element, overlay, modal) {
		element.addEventListener('click', () => {
			overlay.classList.add('visible');
			modal.classList.add('active');
		});
	}

	hideModalOnClick(overlays, modals) {
		overlays.forEach((overlay) => {
			overlay.addEventListener('click', (e) => {
				if (e.target !== e.currentTarget) return;
				overlay.classList.remove('visible');
				modals.forEach((modal) => {
					modal.classList.remove('active', 'visible');
				});
			});
		});
	}

	// Default
	showModalDefault(overlay, modal) {
		overlay.classList.add('visible');
		modal.classList.add('active');
	}

	hideModalDefault(overlay, modal) {
		overlay.classList.remove('visible');
		modal.classList.remove('active');
	}

	// Reset
	resetModal(overlay, modal, form) {
		overlay.classList.remove('visible');
		modal.classList.remove('active');
		form.reset();
	}

	// ---- LOADER LOGIC ----

	loaderToggle(id: string) {
		const loader = document.getElementById(id);
		loader.classList.toggle('active');
	}

	// ---- USER-NAV LOGIC ----

	userDropdownToggle() {
		DOM_ELEMENTS.userNavButton.classList.toggle('active');
		DOM_ELEMENTS.userNavDropdown.classList.toggle('active');
	}

	userDropdownHide() {
		DOM_ELEMENTS.userNavButton.classList.remove('active');
		DOM_ELEMENTS.userNavDropdown.classList.remove('active');
	}

	// ---- USER LOGIC ----

	userSignInSetupUI() {
		DOM_ELEMENTS.userNav.classList.add('active');
		DOM_ELEMENTS.authBlock.classList.remove('active');
		this.displayUserInfo();
	}

	userSignOutSetupUI() {
		DOM_ELEMENTS.userNav.classList.remove('active');
		DOM_ELEMENTS.authBlock.classList.add('active');
		this.removeUserInfo();
	}

	setUser(user: object) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	getUser(): object {
		return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
	}

	signOutUser() {
		localStorage.clear();
		this.userSignOutSetupUI();
	}

	displayUserInfo() {
		const { displayName: name, photoURL: picture } = this.getUser();
		const firstName: string = name.split(' ', 1).toString();
		const getLetter: string = firstName.charAt(0).toUpperCase();
		DOM_ELEMENTS.userName.innerText = firstName;
		if (picture === null) {
			DOM_ELEMENTS.userletter.innerText = getLetter;
		} else {
			DOM_ELEMENTS.userPicture.src = picture;
		}
	}

	removeUserInfo() {
		DOM_ELEMENTS.userName.innerText = '';
		DOM_ELEMENTS.userletter.innerText = '';
		DOM_ELEMENTS.userPicture.removeAttribute('src');
	}
}

export const ui = new UI();

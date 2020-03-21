export const DOM_ELEMENTS = {
	// User

	userNav: document.getElementById('userNav'),
	authBlock: document.getElementById('auth'),
	userName: document.getElementById('userName'),
	userletter: document.getElementById('userLetter'),
	userPicture: document.getElementById('userPicture'),

	// Signup

	overlaySignUp: document.getElementById('overlayForSignUp'),
	modalSignUp: document.getElementById('modalSignUp'),
	formSignUp: document.getElementById('signUpForm'),

	// Signin

	overlaySignIn: document.getElementById('overlayForSignIn'),
	modalSignIn: document.getElementById('modalSignIn'),
	formSignIn: document.getElementById('signInForm'),
	googleSignIn: document.getElementById('googleSignInBtn'),
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

	hideModalOnClick(overlay, modal) {
		overlay.addEventListener('click', (e) => {
			if (e.target !== e.currentTarget) return;
			overlay.classList.remove('visible');
			modal.classList.remove('active');
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

	loaderToggle(id) {
		const loader = document.getElementById(id);
		loader.classList.toggle('active');
	}

	// ---- USER LOGIC ----

	userSignInSetupUI() {
		DOM_ELEMENTS.userNav.classList.add('active');
		DOM_ELEMENTS.authBlock.classList.add('hide');
		this.displayUserInfo();
	}

	userSignOutSetupUI() {
		DOM_ELEMENTS.userNav.classList.remove('active');
		DOM_ELEMENTS.authBlock.classList.remove('hide');
		this.removeUserInfo();
	}

	setUser(user) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	getUser() {
		return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];
	}

	signOutUser() {
		localStorage.clear();
		this.userSignOutSetupUI();
	}

	displayUserInfo() {
		const { displayName: name, photoURL: picture } = this.getUser();
		const firstName = name.split(' ', 1).toString();
		const getLetter = firstName.charAt(0).toUpperCase();
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

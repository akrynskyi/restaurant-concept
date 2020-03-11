const overlay = document.querySelector('.overlay');
const modalSignIn = document.getElementById('modalSignIn');

class UI {
	showModal(element) {
		element.addEventListener('click', () => {
			overlay.classList.add('overlay-visible');
			modalSignIn.classList.add('modal-open');
		});
	}

	hideModalDefault() {
		overlay.classList.remove('overlay-visible');
		modalSignIn.classList.remove('modal-open');
	}

	hideModalOnClick() {
		overlay.addEventListener('click', (e) => {
			if (e.target !== e.currentTarget) return;
			this.hideModalDefault();
		});
	}

	// ---- USER NAV ----
	showUserNav() {
		const userNav = document.querySelector('.bar__user-nav');
		if (userNav.classList.contains('bar__user-nav-visible')) {
			userNav.classList.remove('bar__user-nav-visible');
		} else {
			userNav.classList.add('bar__user-nav-visible');
		}
	}

	hideAuth() {
		const authBlock = document.querySelector('.bar__auth');
		authBlock.classList.add('bar__auth-hide');
	}
}

export const ui = new UI();

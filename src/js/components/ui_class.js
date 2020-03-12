const overlay = document.querySelector('.overlay');
const modalSignIn = document.getElementById('modalSignIn');

class UI {
	// MODAL
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

	// LOADER
	loaderToggle() {
		const loader = document.getElementById('loader');
		loader.classList.toggle('loader-active');
	}

	// USER NAV
	userNavToggle() {
		const userNav = document.querySelector('.bar__user-nav');
		userNav.classList.toggle('bar__user-nav-visible');
	}

	// AUTH BLOCK
	authToggle() {
		const authBlock = document.querySelector('.bar__auth');
		authBlock.classList.toggle('bar__auth-hide');
	}

	displayName(name) {
		const userNameDOM = document.getElementById('userName');
		// const nameSplit = name.split(' ', 1);
		userNameDOM.innerText = `${name}`;
	}

	dispalyUserPhoto(picture) {
		const userPictureDOM = document.getElementById('userPicture');
		userPictureDOM.src = `${picture}`;
	}
}

export const ui = new UI();

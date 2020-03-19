class UI {
	// MODAL
	showModal(element, overlay, modal) {
		element.addEventListener('click', () => {
			overlay.classList.add('overlay-visible');
			modal.classList.add('modal-open');
		});
	}

	showModalDefault(overlay, modal) {
		overlay.classList.add('overlay-visible');
		modal.classList.add('modal-open');
	}

	hideModalDefault(overlay, modal) {
		overlay.classList.remove('overlay-visible');
		modal.classList.remove('modal-open');
	}

	hideModalOnClick(overlay, modal) {
		overlay.addEventListener('click', (e) => {
			if (e.target !== e.currentTarget) return;
			overlay.classList.remove('overlay-visible');
			modal.classList.remove('modal-open');
		});
	}

	// LOADER
	loaderToggle(id) {
		const loader = document.getElementById(id);
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
		const nameSplit = name.split(' ', 1);
		userNameDOM.innerText = `${nameSplit}`;
	}

	displayLetter(name) {
		const letterDOM = document.getElementById('letter');
		const getLetter = name.split('', 1);
		letterDOM.innerText = getLetter;
	}

	displayUserPhoto(picture, id) {
		const userPictureDOM = document.getElementById(id);
		userPictureDOM.src = `${picture}`;
	}

	removeUserPhotoDOM(id) {
		const picture = document.getElementById(id);
		picture.removeAttribute('src');
	}
}

export const ui = new UI();

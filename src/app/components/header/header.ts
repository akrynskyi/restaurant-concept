import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { ui } from '../../../ts/class-ui';
import { signOut } from '../../../ts/authentication';
import { Storage } from '../../../ts/class-storage';

export const header = (): void => {
	DOM_ELEMENTS.header.addEventListener('click', (e) => {
		const { trigger } = (e.target as HTMLElement).dataset;
		switch (trigger) {
			case 'signin':
				ui.showModalDefault(
					DOM_ELEMENTS.overlaySignIn,
					DOM_ELEMENTS.modalSignIn,
				);
				break;

			case 'signup':
				ui.showModalDefault(
					DOM_ELEMENTS.overlaySignUp,
					DOM_ELEMENTS.modalSignUp,
				);
				break;

			case 'search':
				if (
					window.pageYOffset === 0
					&& DOM_ELEMENTS.userNavDropdown.classList.contains('active')
				) {
					DOM_ELEMENTS.searchBar.classList.toggle('active');
				} else if (window.pageYOffset === 0) {
					DOM_ELEMENTS.header.classList.toggle('scrolled');
					DOM_ELEMENTS.searchBar.classList.toggle('active');
				} else {
					DOM_ELEMENTS.searchBar.classList.toggle('active');
				}
				break;

			default:
				break;
		}
	});

	DOM_ELEMENTS.userNavButton.addEventListener('click', () => {
		if (
			window.pageYOffset === 0
			&& DOM_ELEMENTS.searchBar.classList.contains('active')
		) {
			ui.userDropdownToggle();
		} else if (window.pageYOffset === 0) {
			DOM_ELEMENTS.header.classList.toggle('scrolled');
			ui.userDropdownToggle();
		} else {
			ui.userDropdownToggle();
		}
	});

	DOM_ELEMENTS.closeSearchButton.addEventListener('click', () => {
		if (
			window.pageYOffset === 0
			&& DOM_ELEMENTS.userNavDropdown.classList.contains('active')
		) {
			DOM_ELEMENTS.searchBar.classList.remove('active');
		} else if (window.pageYOffset === 0) {
			DOM_ELEMENTS.header.classList.remove('scrolled');
			DOM_ELEMENTS.searchBar.classList.remove('active');
		} else {
			DOM_ELEMENTS.searchBar.classList.remove('active');
		}
	});

	DOM_ELEMENTS.signOutBtn.addEventListener('click', () => {
		if (window.pageYOffset === 0) DOM_ELEMENTS.header.classList.remove('scrolled');
		Storage.clearStorage();
		ui.userDropdownHide();
		signOut();
	});

	// ---- INTERSECTION OBSERVER ----

	const options: object = {
		rootMargin: '-600px 0px 0px 0px',
	};
	const heroObserver = new IntersectionObserver(((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				DOM_ELEMENTS.header.classList.add('scrolled');
				ui.userDropdownHide();
			} else {
				if (DOM_ELEMENTS.searchBar.classList.contains('active')) return;
				DOM_ELEMENTS.header.classList.remove('scrolled');
				ui.userDropdownHide();
			}
		});
	}), options);
	heroObserver.observe(DOM_ELEMENTS.hero);
};

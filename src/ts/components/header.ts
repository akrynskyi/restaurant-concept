import { DOM_ELEMENTS } from './dom-collection';
import { ui } from './class-ui';
import { signOut } from './authentication';

export const header = (): void => {
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

	DOM_ELEMENTS.searchButton.addEventListener('click', () => {
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
	});

	DOM_ELEMENTS.signOutBtn.addEventListener('click', () => {
		signOut();
		ui.userDropdownHide();
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

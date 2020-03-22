import { DOM_ELEMENTS, ui } from './ui_class';
import { signOut } from '../firebase/authentication';

export const header = () => {
	// ---- DOM ELEMENTS ----

	const searchBar = document.querySelector('.search-bar');
	const headerNav = document.querySelector('.header');
	const hero = document.querySelector('.hero');
	const searchButton = document.getElementById('searchBtn');
	const signOutBtn = document.getElementById('signOutBtn');

	DOM_ELEMENTS.userNavButton.addEventListener('click', () => {
		if (
			window.pageYOffset === 0
			&& searchBar.classList.contains('active')
		) {
			ui.userDropdownToggle();
		} else if (window.pageYOffset === 0) {
			headerNav.classList.toggle('scrolled');
			ui.userDropdownToggle();
		} else {
			ui.userDropdownToggle();
		}
	});

	searchButton.addEventListener('click', () => {
		if (
			window.pageYOffset === 0
			&& DOM_ELEMENTS.userNavDropdown.classList.contains('active')
		) {
			searchBar.classList.toggle('active');
		} else if (window.pageYOffset === 0) {
			headerNav.classList.toggle('scrolled');
			searchBar.classList.toggle('active');
		} else {
			searchBar.classList.toggle('active');
		}
	});

	signOutBtn.addEventListener('click', () => {
		signOut();
		ui.userDropdownHide();
	});

	// ---- INTERSECTION OBSERVER ----
	const options = {
		rootMargin: '-600px 0px 0px 0px',
	};
	const heroObserver = new IntersectionObserver(((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				headerNav.classList.add('scrolled');
				ui.userDropdownHide();
			} else {
				if (searchBar.classList.contains('active')) return;
				headerNav.classList.remove('scrolled');
				ui.userDropdownHide();
			}
		});
	}), options);
	heroObserver.observe(hero);
};

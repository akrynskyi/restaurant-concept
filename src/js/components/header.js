import { signOut } from '../firebase/authentication';

export const header = () => {
	// ---- DOM ELEMENTS ----
	const dropdownMenu = document.querySelector('.dropdown-menu');
	const searchBar = document.querySelector('.search-bar');
	const headerNav = document.querySelector('.header');
	const hero = document.querySelector('.hero');
	const userNavButton = document.getElementById('userNavBtn');
	const searchButton = document.getElementById('searchBtn');
	const signOutBtn = document.getElementById('signOutBtn');

	userNavButton.addEventListener('click', () => {
		dropdownMenu.classList.toggle('active');
		userNavButton.classList.toggle('active');
		headerNav.classList.toggle('scrolled');
		if (dropdownMenu.classList.contains('active')) {
			headerNav.classList.add('scrolled');
		}
	});

	searchButton.addEventListener('click', () => {
		searchBar.classList.toggle('active');
		headerNav.classList.toggle('scrolled');
		if (searchBar.classList.contains('active')) {
			headerNav.classList.add('scrolled');
		}
	});

	signOutBtn.addEventListener('click', () => {
		signOut();
		dropdownMenu.classList.remove('active');
		userNavButton.classList.remove('active');
	});

	// ---- INTERSECTION OBSERVER ----
	const options = {
		rootMargin: '-600px 0px 0px 0px',
	};
	const heroObserver = new IntersectionObserver(((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				headerNav.classList.add('scrolled');
				dropdownMenu.classList.remove('active');
				userNavButton.classList.remove('active');
			} else {
				if (searchBar.classList.contains('active')) return;
				headerNav.classList.remove('scrolled');
				dropdownMenu.classList.remove('active');
				userNavButton.classList.remove('active');
			}
		});
	}), options);
	heroObserver.observe(hero);
};

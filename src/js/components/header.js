export const header = () => {
	// ---- DOM ELEMENTS ----
	const dropdownMenu = document.querySelector('.dropdown-menu');
	const searchBar = document.querySelector('.search-bar');
	const headerNav = document.querySelector('.header');
	const hero = document.querySelector('.hero');
	const userNavButton = document.getElementById('userNavBtn');
	const searchButton = document.getElementById('searchBtn');

	// ---- SHOW USER MENU ----
	userNavButton.addEventListener('click', () => {
		dropdownMenu.classList.toggle('dropdown-menu-open');
		userNavButton.classList.toggle('user-nav__btn-active');
	});

	// ---- ACTIVATE SEARCH BAR ----
	searchButton.addEventListener('click', () => {
		searchBar.classList.toggle('search-bar-active');
		headerNav.classList.toggle('header-scrolled');
		if (searchBar.classList.contains('search-bar-active')) {
			headerNav.classList.add('header-scrolled');
		}
	});

	// ---- OBSERVER ----
	const options = {
		rootMargin: '-600px 0px 0px 0px',
	};
	const heroObserver = new IntersectionObserver(((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				headerNav.classList.add('header-scrolled');
				// searchBar.classList.remove('search-bar-active');
			} else {
				if (searchBar.classList.contains('search-bar-active')) return;
				headerNav.classList.remove('header-scrolled');
			}
			// console.log(entry);
		});
	}), options);
	heroObserver.observe(hero);
};

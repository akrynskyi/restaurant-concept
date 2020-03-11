export const header = () => {
	// ---- DOM ELEMENTS ----
	const dropdownMenu = document.querySelector('.dropdown-menu');
	const searchBar = document.querySelector('.search-bar');
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
	});
};

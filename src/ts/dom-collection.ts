export const DOM_ELEMENTS = {
	// Header

	header: document.querySelector('.header'),
	searchBar: document.querySelector('.search-bar'),
	searchButton: document.getElementById('searchBtn'),
	hero: document.querySelector('.hero'),
	heroHeader: document.getElementById('heroHeader'),
	heroBlock: document.getElementById('heroBlock'),

	// User

	userNav: document.getElementById('userNav'),
	userNavButton: document.getElementById('userNavBtn'),
	userNavDropdown: document.querySelector('.dropdown-menu'),
	userName: document.getElementById('userName'),
	userletter: document.getElementById('userLetter'),
	userPicture: document.getElementById('userPicture'),
	authBlock: document.getElementById('auth'),

	// Signup

	signUpButton: document.getElementById('signUpBtn'),
	overlaySignUp: document.getElementById('overlayForSignUp'),
	modalSignUp: document.getElementById('modalSignUp'),

	// Signin

	signInButton: document.getElementById('signInBtn'),
	signInRedirectBtns: document.querySelectorAll('[data-action="signin"]'),
	overlaySignIn: document.getElementById('overlayForSignIn'),
	modalSignIn: document.getElementById('modalSignIn'),
	modalResetPass: document.getElementById('modalResetPass'),

	// Sign out

	signOutBtn: document.getElementById('signOutBtn'),

	// Products

	productsContainer: document.getElementById('productsContainer'),

	// Gallery

	galleryContainer: document.getElementById('galleryContainer'),
	categoriesNav: document.getElementById('categoriesNav'),
	categoriesNavOptions: document.querySelectorAll('[data-key]'),
	photosPerpageSelect: document.getElementById('perpage'),
	galleryPagination: document.getElementById('galleryPagination'),
	currentPage: document.getElementById('currentPage'),

	// Notification

	notification: document.getElementById('notif'),
	notifMessage: document.getElementById('notifMessage'),
	closeNotifBtn: document.getElementById('closeNotif'),

	// Sidebar

	sidebar: document.getElementById('sidebar'),
};

export const DOM_FORMS = {
	formSignUp: document.getElementById('signUpForm') as HTMLFormElement,
	formSignIn: document.getElementById('signInForm') as HTMLFormElement,
	formResetPass: document.getElementById('resetPassForm') as HTMLFormElement,
};

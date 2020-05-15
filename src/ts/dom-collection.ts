export const DOM_ELEMENTS = {
	// Header

	header: document.querySelector('.header'),
	searchBar: document.querySelector('.search-bar'),
	closeSearchButton: document.getElementById('closeSearchBtn'),

	// Hero

	hero: document.querySelector('.hero'),
	heroHeader: document.getElementById('heroHeader'),
	heroBlockFirst: document.getElementById('heroBlockFirst'),
	heroBlockSecond: document.getElementById('heroBlockSecond'),
	bookingDate: document.getElementById('bookingDate'),
	bookingTime: document.getElementById('bookingTime'),
	tables: document.querySelectorAll('[data-table]'),
	tipWorkingHours: document.getElementById('tipWorkingHours'),

	// User

	userNav: document.getElementById('userNav'),
	userNavButton: document.getElementById('userNavBtn'),
	userNavDropdown: document.querySelector('.dropdown-menu'),
	userName: document.getElementById('userName'),
	userletter: document.getElementById('userLetter'),
	userPicture: document.getElementById('userPicture'),
	userEmail: document.getElementById('userEmail'),
	authBlock: document.getElementById('auth'),

	// Signup

	overlaySignUp: document.getElementById('overlayForSignUp'),
	modalSignUp: document.getElementById('modalSignUp'),

	// Signin

	signInRedirectBtns: document.querySelectorAll('[data-action="signin"]'),
	overlaySignIn: document.getElementById('overlayForSignIn'),
	modalSignIn: document.getElementById('modalSignIn'),
	modalResetPass: document.getElementById('modalResetPass'),

	// Sign out

	signOutBtn: document.getElementById('signOutBtn'),

	// Home

	slideInPanels: document.querySelectorAll('[data-slidein="panel"]'),
	subscribeSection: document.getElementById('subscribeSection'),

	// Products

	productsWrapper: document.getElementById('productsWrapper'),
	productsContainer: document.getElementById('productsContainer'),
	productsPagination: document.getElementById('productsPagination'),
	productsCategoryList: document.querySelectorAll('[data-category]'),
	productsSort: document.getElementById('productsSort'),
	btnProductsSort: document.getElementById('btnProductsSort'),
	redoIco: document.getElementById('redoIco'),
	prodPagWrapper: document.getElementById('prodPagWrapper'),

	// Gallery

	galleryContainer: document.getElementById('galleryContainer'),
	categoriesNav: document.getElementById('categoriesNav'),
	categoriesNavOptions: document.querySelectorAll('[data-key]'),
	photosPerpageSelect: document.getElementById('perpage'),
	galleryPagination: document.getElementById('galleryPagination'),
	currentPage: document.getElementById('currentPage'),

	// Profile

	profileHeader: document.getElementById('profileHeader'),
	profileDash: document.getElementById('profileDash'),
	reservationTotal: document.getElementById('reservTotal'),
	favouriteScrollable: document.getElementById('favouriteScrollable'),
	reservationScrollable: document.getElementById('reservationScrollable'),

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
	formBooking: document.getElementById('bookingForm') as HTMLFormElement,
};

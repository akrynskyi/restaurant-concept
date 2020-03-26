import { Collection } from './interfaces';

export const DOM_ELEMENTS: Collection = {
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
	formSignUp: document.getElementById('signUpForm'),

	// Signin

	signInButton: document.getElementById('signInBtn'),
	signInRedirectBtns: document.querySelectorAll('[data-action="signin"]'),
	overlaySignIn: document.getElementById('overlayForSignIn'),
	modalSignIn: document.getElementById('modalSignIn'),
	formSignIn: document.getElementById('signInForm'),
	modalResetPass: document.getElementById('modalResetPass'),

	// Sign out

	signOutBtn: document.getElementById('signOutBtn'),
};

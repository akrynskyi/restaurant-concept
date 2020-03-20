import { ui } from './ui_class';

export const modal = () => {
	// ---- DOM ELEMENTS ----
	const signInButton = document.getElementById('signInBtn');
	const signUpButton = document.getElementById('signUpBtn');
	const overlayForSignIn = document.getElementById('overlayForSignIn');
	const overlayForSignUp = document.getElementById('overlayForSignUp');
	const modalSignIn = document.getElementById('modalSignIn');
	const modalSignUp = document.getElementById('modalSignUp');
	const signUpRedirectBtn = document.getElementById('signUpLink');
	const signInRedirectBtn = document.getElementById('signInRedirectBtn');

	ui.showModalOnClick(signInButton, overlayForSignIn, modalSignIn);
	ui.showModalOnClick(signUpButton, overlayForSignUp, modalSignUp);
	ui.hideModalOnClick(overlayForSignIn, modalSignIn);
	ui.hideModalOnClick(overlayForSignUp, modalSignUp);

	signUpRedirectBtn.addEventListener('click', () => {
		ui.hideModalDefault(overlayForSignIn, modalSignIn);
		ui.showModalDefault(overlayForSignUp, modalSignUp);
	});

	signInRedirectBtn.addEventListener('click', () => {
		ui.hideModalDefault(overlayForSignUp, modalSignUp);
		ui.showModalDefault(overlayForSignIn, modalSignIn);
	});
};

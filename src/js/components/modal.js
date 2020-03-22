import { DOM_ELEMENTS, ui } from './ui_class';
import { signUp, signInWithEmailAndPass, signInWithGoogle } from '../firebase/authentication';
import { googleAuthProvider } from '../firebase/firebase';

export const modal = () => {
	// ---- SIGN-UP ----

	ui.showModalOnClick(
		DOM_ELEMENTS.signUpButton,
		DOM_ELEMENTS.overlaySignUp,
		DOM_ELEMENTS.modalSignUp,
	);
	ui.hideModalOnClick(
		DOM_ELEMENTS.overlaySignUp,
		DOM_ELEMENTS.modalSignUp,
	);

	DOM_ELEMENTS.formSignUp.addEventListener('submit', (e) => {
		e.preventDefault();
		const {
			firstname,
			lastname,
			email,
			password,
		} = e.currentTarget;

		signUp(
			{
				firstname: firstname.value,
				lastname: lastname.value,
				email: email.value,
				password: password.value,
			},
			{
				overlay: DOM_ELEMENTS.overlaySignUp,
				modal: DOM_ELEMENTS.modalSignUp,
				form: DOM_ELEMENTS.formSignUp,
			},
		);
	});

	// ---- SIGN-IN ----

	ui.showModalOnClick(
		DOM_ELEMENTS.signInButton,
		DOM_ELEMENTS.overlaySignIn,
		DOM_ELEMENTS.modalSignIn,
	);
	ui.hideModalOnClick(
		DOM_ELEMENTS.overlaySignIn,
		DOM_ELEMENTS.modalSignIn,
	);

	DOM_ELEMENTS.formSignIn.addEventListener('submit', (e) => {
		e.preventDefault();
		const {
			email,
			password,
		} = e.currentTarget;

		signInWithEmailAndPass(
			{
				email: email.value,
				password: password.value,
			},
			{
				overlay: DOM_ELEMENTS.overlaySignIn,
				modal: DOM_ELEMENTS.modalSignIn,
				form: DOM_ELEMENTS.formSignIn,
			},
		);
	});

	DOM_ELEMENTS.googleSignIn.addEventListener('click', () => {
		signInWithGoogle(
			googleAuthProvider,
			{
				overlay: DOM_ELEMENTS.overlaySignIn,
				modal: DOM_ELEMENTS.modalSignIn,
				form: DOM_ELEMENTS.formSignIn,
			},
		);
	});

	// ---- REDIRECT ----

	DOM_ELEMENTS.signUpRedirectBtn.addEventListener('click', () => {
		ui.hideModalDefault(
			DOM_ELEMENTS.overlaySignIn,
			DOM_ELEMENTS.modalSignIn,
		);
		ui.showModalDefault(
			DOM_ELEMENTS.overlaySignUp,
			DOM_ELEMENTS.modalSignUp,
		);
	});

	DOM_ELEMENTS.signInRedirectBtn.addEventListener('click', () => {
		ui.hideModalDefault(
			DOM_ELEMENTS.overlaySignUp,
			DOM_ELEMENTS.modalSignUp,
		);
		ui.showModalDefault(
			DOM_ELEMENTS.overlaySignIn,
			DOM_ELEMENTS.modalSignIn,
		);
	});
};

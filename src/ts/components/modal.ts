import { DOM_ELEMENTS, ui } from './ui_class';
import { signUp, signInWithEmailAndPass, signInWithGoogle } from './authentication';
import { googleAuthProvider } from '../../js/firebase.cofig';

export const modal = (): void => {
	// ---- Default ----

	ui.hideModalOnClick(
		[
			DOM_ELEMENTS.overlaySignIn,
			DOM_ELEMENTS.overlaySignUp,
		],
		[
			DOM_ELEMENTS.modalSignIn,
			DOM_ELEMENTS.modalSignUp,
			DOM_ELEMENTS.modalResetPass,
		],
	);

	// ---- SIGN-UP ----

	ui.showModalOnClick(
		DOM_ELEMENTS.signUpButton,
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

	DOM_ELEMENTS.modalSignIn.addEventListener('click', (e) => {
		const { action } = e.target.dataset;
		switch (action) {
			case 'google':
				signInWithGoogle(
					googleAuthProvider,
					{
						overlay: DOM_ELEMENTS.overlaySignIn,
						modal: DOM_ELEMENTS.modalSignIn,
						form: DOM_ELEMENTS.formSignIn,
					},
				);
				break;
			case 'reset':
				DOM_ELEMENTS.modalResetPass.classList.add('visible');
				break;
			case 'signup':
				ui.hideModalDefault(
					DOM_ELEMENTS.overlaySignIn,
					DOM_ELEMENTS.modalSignIn,
				);
				ui.showModalDefault(
					DOM_ELEMENTS.overlaySignUp,
					DOM_ELEMENTS.modalSignUp,
				);
				break;
			default:
				break;
		}
	});

	// ---- REDIRECT ----

	DOM_ELEMENTS.signInRedirectBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			if (DOM_ELEMENTS.modalSignUp.classList.contains('active')) {
				ui.hideModalDefault(
					DOM_ELEMENTS.overlaySignUp,
					DOM_ELEMENTS.modalSignUp,
				);
				ui.showModalDefault(
					DOM_ELEMENTS.overlaySignIn,
					DOM_ELEMENTS.modalSignIn,
				);
			} else {
				DOM_ELEMENTS.modalResetPass.classList.remove('visible');
			}
		});
	});
};

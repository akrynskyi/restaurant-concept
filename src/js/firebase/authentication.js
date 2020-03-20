import { auth } from './firebase';
import { ui } from '../components/ui_class';

const overlayForSignIn = document.getElementById('overlayForSignIn');
const overlayForSignUp = document.getElementById('overlayForSignUp');
const modalSignIn = document.getElementById('modalSignIn');
const modalSignUp = document.getElementById('modalSignUp');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const googleBtn = document.getElementById('googleBtn');

// ---- AUTH STATUS ----

auth
	.onAuthStateChanged((user) => {
		if (user) {
			console.log('sign in');
			ui.signInUser(user);
		} else {
			console.log('sign out');
			ui.signOutUser();
		}
	});

// ---- SIGN UP WITH EMAIL & PASSWORD ----

signUpForm.addEventListener('submit', (e) => {
	const email = signUpForm.signUpEmail.value;
	const password = signUpForm.signUpPassword.value;
	e.preventDefault();
	ui.loaderToggle('loaderSignUp');
	auth
		.createUserWithEmailAndPassword(email, password)
		.then(() => {
			ui.loaderToggle('loaderSignUp');
			ui.resetModal(overlayForSignUp, modalSignUp, signUpForm);
		})
		.catch((error) => {
			ui.loaderToggle('loaderSignUp');
			console.error(error);
		});
});

// ---- SIGN IN WITH EMAIL & PASSWORD ----

signInForm.addEventListener('submit', (e) => {
	const email = signInForm.signInEmail.value;
	const password = signInForm.signInPassword.value;
	e.preventDefault();
	ui.loaderToggle('loaderSignIn');
	auth
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			ui.loaderToggle('loaderSignIn');
			ui.resetModal(overlayForSignIn, modalSignIn, signInForm);
		})
		.catch((error) => {
			ui.loaderToggle('loaderSignIn');
			console.error(error);
		});
});

// ---- SIGN IN WITH GOOGLE ACCOUNT ----

const provider = new firebase.auth.GoogleAuthProvider();
googleBtn.addEventListener('click', () => {
	ui.loaderToggle('loaderSignIn');
	firebase
		.auth()
		.signInWithPopup(provider)
		.then(() => {
			ui.loaderToggle('loaderSignIn');
			ui.resetModal(overlayForSignIn, modalSignIn, signInForm);
		})
		.catch((error) => {
			console.log(error);
			ui.loaderToggle('loaderSignIn');
		});
});

// ---- SIGN OUT ----

export const signOut = () => {
	auth
		.signOut()
		.catch((error) => {
			console.error(error);
		});
};

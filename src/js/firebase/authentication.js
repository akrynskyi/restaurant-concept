import { auth } from './firebase';
import { ui } from '../components/ui_class';

const signInForm = document.getElementById('signInForm');
const emailDOM = signInForm.signInEmail;
const passwordDOM = signInForm.signInPassword;
const loader = document.getElementById('loader');
const signOutBtn = document.getElementById('signOutBtn');

// ---- SIGN IN ----
signInForm.addEventListener('submit', (e) => {
	const email = emailDOM.value;
	const password = passwordDOM.value;
	e.preventDefault();
	loader.classList.add('loader-active');

	auth
		.createUserWithEmailAndPassword(email, password)
		.then((data) => {
			console.log(data);

			loader.classList.remove('loader-active');
			ui.hideModalDefault();
			signInForm.reset();
			ui.showUserNav();
			ui.hideAuth();
		})
		.catch((error) => {
			loader.classList.remove('loader-active');
			console.error(error);
		});
});

// ---- SIGN OUT ----
signOutBtn.addEventListener('click', (e) => {
	e.preventDefault();
	auth
		.signOut()
		.then(() => {
			console.log('sign out');
			ui.showUserNav();
			ui.hideAuth();
		});
});

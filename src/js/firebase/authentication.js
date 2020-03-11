import { auth } from './firebase';
import { ui } from '../components/ui_class';

const signInForm = document.getElementById('signInForm');
const emailDOM = signInForm.signInEmail;
const passwordDOM = signInForm.signInPassword;
const loader = document.getElementById('loader');

signInForm.addEventListener('submit', (e) => {
	const email = emailDOM.value;
	const password = passwordDOM.value;
	e.preventDefault();
	loader.classList.add('loader-active');
	// ---- SIGN IN ----
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

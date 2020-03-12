import { auth } from './firebase';
import { ui } from '../components/ui_class';

const signInForm = document.getElementById('signInForm');
const emailDOM = signInForm.signInEmail;
const passwordDOM = signInForm.signInPassword;
const signOutBtn = document.getElementById('signOutBtn');
const googleBtn = document.getElementById('googleBtn');

// ---- SIGN IN WITH EMAIL & PASSWORD
signInForm.addEventListener('submit', (e) => {
	const email = emailDOM.value;
	const password = passwordDOM.value;
	e.preventDefault();
	ui.loaderToggle();
	auth
		.createUserWithEmailAndPassword(email, password)
		.then((data) => {
			console.log(data);
			ui.loaderToggle();
			ui.hideModalDefault();
			ui.userNavToggle();
			ui.authToggle();
			signInForm.reset();
		})
		.catch((error) => {
			ui.loaderToggle();
			console.error(error);
		});
});

// ---- SIGN IN WITH GOOGLE ACCOUNT
const provider = new firebase.auth.GoogleAuthProvider();
googleBtn.addEventListener('click', () => {
	ui.loaderToggle();
	firebase
		.auth()
		.signInWithPopup(provider)
		.then((result) => {
			const { profile: user } = result.additionalUserInfo;
			const { given_name: name, picture } = user;
			console.log(user);
			ui.loaderToggle();
			ui.hideModalDefault();
			ui.userNavToggle();
			ui.authToggle();
			ui.displayName(name);
			ui.dispalyUserPhoto(picture);
		})
		.catch((error) => {
			console.log(error);
			ui.loaderToggle();
		});
});

// ---- SIGN OUT
signOutBtn.addEventListener('click', (e) => {
	e.preventDefault();
	auth
		.signOut()
		.then(() => {
			console.log('sign out');
			ui.userNavToggle();
			ui.authToggle();
		});
});

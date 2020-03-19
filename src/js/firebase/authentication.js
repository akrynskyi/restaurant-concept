import { auth } from './firebase';
import { ui } from '../components/ui_class';

const overlayForSignIn = document.getElementById('overlayForSignIn');
const overlayForSignUp = document.getElementById('overlayForSignUp');
const modalSignIn = document.getElementById('modalSignIn');
const modalSignUp = document.getElementById('modalSignUp');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const signOutBtn = document.getElementById('signOutBtn');
const googleBtn = document.getElementById('googleBtn');

// ---- AUTH STATUS
auth
	.onAuthStateChanged((user) => {
		if (user) {
			const profile = user.providerData[0];
			const { photoURL: picture } = profile;
			let { displayName: name } = profile;
			ui.userNavToggle();
			ui.authToggle();
			if (name == null) {
				name = 'Name';
				ui.displayName(name);
			} if (picture == null) {
				ui.displayLetter(name);
			} else {
				ui.displayName(name);
				ui.displayUserPhoto(picture, 'userPicture');
			}
			console.log(profile);
		}
	});

// ---- SIGN UP WITH EMAIL & PASSWORD
signUpForm.addEventListener('submit', (e) => {
	const email = signUpForm.signUpEmail.value;
	const password = signUpForm.signUpPassword.value;
	e.preventDefault();
	ui.loaderToggle('loaderSignUp');
	auth
		.createUserWithEmailAndPassword(email, password)
		.then((data) => {
			console.log(data);
			ui.loaderToggle('loaderSignUp');
			ui.hideModalDefault(overlayForSignUp, modalSignUp);
			signUpForm.reset();
		})
		.catch((error) => {
			ui.loaderToggle('loaderSignUp');
			console.error(error);
		});
});

// ---- SIGN IN WITH EMAIL & PASSWORD
signInForm.addEventListener('submit', (e) => {
	const email = signInForm.signInEmail.value;
	const password = signInForm.signInPassword.value;
	e.preventDefault();
	ui.loaderToggle('loaderSignIn');
	auth
		.signInWithEmailAndPassword(email, password)
		.then((data) => {
			console.log(data.user);
			ui.loaderToggle('loaderSignIn');
			ui.hideModalDefault(overlayForSignIn, modalSignIn);
			signInForm.reset();
		})
		.catch((error) => {
			ui.loaderToggle('loaderSignIn');
			console.error(error);
		});
});

// ---- SIGN IN WITH GOOGLE ACCOUNT
const provider = new firebase.auth.GoogleAuthProvider();
googleBtn.addEventListener('click', () => {
	ui.loaderToggle('loaderSignIn');
	firebase
		.auth()
		.signInWithPopup(provider)
		.then((result) => {
			console.log(result);
			ui.loaderToggle('loaderSignIn');
			ui.hideModalDefault(overlayForSignIn, modalSignIn);
		})
		.catch((error) => {
			console.log(error);
			ui.loaderToggle('loaderSignIn');
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
			ui.displayName(' ');
			ui.removeUserPhotoDOM('userPicture');
			ui.displayLetter('');
		});
});

import { auth } from './firebase';
import { ui } from '../components/ui_class';

// ---- AUTH STATUS ----

auth
	.onAuthStateChanged((user) => {
		if (user) {
			console.log('sign in');
		} else {
			console.log('sign out');
			ui.signOutUser();
		}
	});

document.addEventListener('DOMContentLoaded', () => {
	if (localStorage.getItem('user')) {
		ui.userSignInSetupUI();
	} else {
		ui.userSignOutSetupUI();
	}
});

// ---- SIGN UP WITH EMAIL & PASSWORD ----

export const signUp = (userdata, elements) => {
	const {
		firstname,
		lastname,
		email,
		password,
	} = userdata;
	const {
		overlay,
		modal,
		form,
	} = elements;
	ui.loaderToggle('loaderSignUp');
	auth
		.createUserWithEmailAndPassword(email, password)
		.finally(() => {
			ui.loaderToggle('loaderSignUp');
		})
		.then((credential) => {
			const { user } = credential;
			return user.updateProfile({
				displayName: `${firstname} ${lastname}`,
			});
		})
		.then(() => {
			const user = auth.currentUser;
			ui.setUser(user);
			ui.userSignInSetupUI();
		})
		.then(() => {
			ui.resetModal(overlay, modal, form);
		})
		.catch((error) => {
			console.error(error);
		});
};

// ---- SIGN IN WITH EMAIL & PASSWORD ----

export const signInWithEmailAndPass = (userdata, elements) => {
	const {
		email,
		password,
	} = userdata;
	const {
		overlay,
		modal,
		form,
	} = elements;
	ui.loaderToggle('loaderSignIn');
	auth
		.signInWithEmailAndPassword(email, password)
		.finally(() => {
			ui.loaderToggle('loaderSignIn');
		})
		.then((credential) => {
			const { user } = credential;
			ui.setUser(user);
			ui.userSignInSetupUI();
		})
		.then(() => {
			ui.resetModal(overlay, modal, form);
		})
		.catch((error) => {
			console.error(error);
		});
};

// ---- SIGN IN WITH GOOGLE ACCOUNT ----

export const signInWithGoogle = (provider, elements) => {
	const {
		overlay,
		modal,
		form,
	} = elements;
	ui.loaderToggle('loaderSignIn');
	firebase
		.auth()
		.signInWithPopup(provider)
		.finally(() => {
			ui.loaderToggle('loaderSignIn');
		})
		.then((credential) => {
			const { user } = credential;
			ui.setUser(user);
			ui.userSignInSetupUI();
		})
		.then(() => {
			ui.resetModal(overlay, modal, form);
		})
		.catch((error) => {
			console.log(error);
		});
};

// ---- SIGN OUT ----

export const signOut = () => {
	auth
		.signOut()
		.catch((error) => {
			console.error(error);
		});
};

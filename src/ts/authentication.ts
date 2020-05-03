import { auth } from '../js/firebase.cofig';
import { ui } from './class-ui';
import { Storage } from './class-storage';
import { Credential, Modal } from './interfaces';
import { notif } from '../app/components/notification/notification-subject';
import { database } from './database';

// ---- AUTH STATUS ----

auth.onAuthStateChanged((user) => {
	database.user = user;
	if (!user && document.title !== 'Profile') {
		ui.signOutUser();
	}
});

document.addEventListener('DOMContentLoaded', () => {
	if (localStorage.getItem('user') && document.title !== 'Profile') {
		ui.userSignInSetupUI();
	} else if (!localStorage.getItem('user') && document.title !== 'Profile') {
		ui.userSignOutSetupUI();
	}
});

// ---- SIGN UP WITH EMAIL & PASSWORD ----

export const signUp = (userdata: Credential, elements: Modal) => {
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
			window.location.hash = '#signin';
		})
		.then((credential) => {
			const { user } = credential;
			return user.updateProfile({
				displayName: `${firstname} ${lastname}`,
			});
		})
		.then(() => {
			const user = auth.currentUser;
			Storage.setUser(user);
			ui.userSignInSetupUI();
			notif.getMessage({ message: `Welcome! ${user.displayName}` });
		})
		.then(() => {
			ui.resetModal(overlay, modal, form);
		})
		.catch((error) => {
			notif.getMessage(error);
		});
};

// ---- SIGN IN WITH EMAIL & PASSWORD ----

export const signInWithEmailAndPass = (userdata: Credential, elements: Modal) => {
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
			window.location.hash = '#signin';
		})
		.then((credential) => {
			const { user } = credential;
			Storage.setUser(user);
			ui.userSignInSetupUI();
			notif.getMessage({ message: `Welcome! ${user.displayName}` });
		})
		.then(() => {
			ui.resetModal(overlay, modal, form);
		})
		.catch((error) => {
			notif.getMessage(error);
		});
};

// ---- SIGN IN WITH GOOGLE ACCOUNT ----

export const signInWithGoogle = (provider: any, elements: Modal) => {
	const {
		overlay,
		modal,
		form,
	} = elements;
	ui.loaderToggle('loaderSignIn');
	auth
		.signInWithPopup(provider)
		.finally(() => {
			ui.loaderToggle('loaderSignIn');
		})
		.then((credential) => {
			const { user } = credential;
			Storage.setUser(user);
			ui.userSignInSetupUI();
			notif.getMessage({ message: `Welcome! ${user.displayName}` });
		})
		.then(() => {
			ui.resetModal(overlay, modal, form);
		})
		.catch((error) => {
			notif.getMessage(error);
		});
};

// ---- SEND A PASSWORD RESET EMAIL ----

export const passwordReset = (email: string, elements: Modal) => {
	const {
		overlay,
		modal,
		form,
	} = elements;
	ui.loaderToggle('loaderResetPass');
	auth
		.sendPasswordResetEmail(email)
		.finally(() => {
			ui.loaderToggle('loaderResetPass');
		})
		.then(() => {
			ui.resetModal(overlay, modal, form);
		})
		.catch((error) => {
			notif.getMessage(error);
		});
};

// ---- SIGN OUT ----

export const signOut = () => {
	auth
		.signOut()
		.catch((error) => {
			notif.getMessage(error);
		});
};

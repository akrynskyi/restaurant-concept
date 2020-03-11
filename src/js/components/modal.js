import { ui } from './ui_class';

export const modal = () => {
	// ---- DOM ELEMENTS ----
	const signInButton = document.getElementById('signInBtn');

	ui.showModal(signInButton);
	ui.hideModalOnClick();
};

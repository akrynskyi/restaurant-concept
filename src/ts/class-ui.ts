import { DOM_ELEMENTS } from './dom-collection';
import { Storage } from './class-storage';

class UI {
	// ---- MODAL LOGIC ----

	// On click
	showModalOnClick(element: Element, overlay: Element, modal: Element) {
		element.addEventListener('click', () => {
			overlay.classList.add('visible');
			modal.classList.add('active');
		});
	}

	hideModalOnClick(overlays: Array<Element>, modals: Array<Element>) {
		overlays.forEach((overlay: Element) => {
			overlay.addEventListener('click', (e) => {
				if (e.target !== e.currentTarget) return;
				overlay.classList.remove('visible');
				modals.forEach((modal: Element) => {
					modal.classList.remove('active', 'visible');
				});
			});
		});
	}

	// Default
	showModalDefault(overlay: Element, modal: Element) {
		overlay.classList.add('visible');
		modal.classList.add('active');
	}

	hideModalDefault(overlay: Element, modal: Element) {
		overlay.classList.remove('visible');
		modal.classList.remove('active');
	}

	// Reset
	resetModal(overlay: Element, modal: Element, form: HTMLFormElement) {
		if (overlay === undefined) {
			modal.classList.remove('active', 'visible');
			form.reset();
		} else {
			overlay.classList.remove('visible');
			modal.classList.remove('active', 'visible');
			form.reset();
		}
	}

	// ---- LOADER LOGIC ----

	loaderToggle(id: string) {
		const loader = document.getElementById(id);
		loader.classList.toggle('active');
	}

	// ---- USER-NAV LOGIC ----

	userDropdownToggle() {
		DOM_ELEMENTS.userNavButton.classList.toggle('active');
		DOM_ELEMENTS.userNavDropdown.classList.toggle('active');
	}

	userDropdownHide() {
		DOM_ELEMENTS.userNavButton.classList.remove('active');
		DOM_ELEMENTS.userNavDropdown.classList.remove('active');
	}

	// ---- USER LOGIC ----

	userSignInSetupUI() {
		DOM_ELEMENTS.userNav.classList.add('active');
		DOM_ELEMENTS.authBlock.classList.remove('active');
		this.displayUserInfo();
	}

	userSignOutSetupUI() {
		DOM_ELEMENTS.userNav.classList.remove('active');
		DOM_ELEMENTS.authBlock.classList.add('active');
		this.removeUserInfo();
	}

	signOutUser() {
		Storage.clearStorage();
		this.userSignOutSetupUI();
	}

	displayUserInfo() {
		const { displayName: name, photoURL: picture } = Storage.getUser();
		const firstName: string = name.split(' ', 1).toString();
		const getLetter: string = firstName.charAt(0).toUpperCase();
		DOM_ELEMENTS.userName.innerText = firstName;
		if (picture === null) {
			DOM_ELEMENTS.userletter.innerText = getLetter;
		} else {
			(DOM_ELEMENTS.userPicture as HTMLImageElement).src = picture;
		}
	}

	removeUserInfo() {
		DOM_ELEMENTS.userName.innerText = '';
		DOM_ELEMENTS.userletter.innerText = '';
		DOM_ELEMENTS.userPicture.removeAttribute('src');
	}

	// ---- PRODUCTS ----
	// Page transition

	pageTransition(element: HTMLElement, action: string, className: string = 'active') {
		switch (action) {
			case 'add':
				element.classList.add(className);
				break;

			case 'remove':
				element.classList.remove(className);
				break;

			default:
				break;
		}
	}

	displayTooltip(selector: string, action: string) {
		const tooltips = document.querySelectorAll(selector);
		tooltips.forEach((tooltip) => {
			switch (action) {
				case 'disable':
					tooltip.classList.add('tooltip-disabled');
					tooltip.classList.remove('tooltip');
					break;

				case 'enable':
					tooltip.classList.remove('tooltip-disabled');
					tooltip.classList.add('tooltip');
					break;

				default:
					break;
			}
		});
	}

	// ---- GALLERY ----
	// Categories navigation

	optionActive(event: Event, options: NodeListOf<Element>) {
		options.forEach((option) => {
			option.classList.remove('active');
		});
		(event.target as HTMLElement).classList.add('active');
	}
}

export const ui = new UI();

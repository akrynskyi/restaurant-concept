import { DOM_ELEMENTS } from '../../../ts/dom-collection';

export const hero = (): void => {
	const chevronIcon = document.getElementById('chevronIcon');

	// ---- SHOW BOOKING FORM ----

	DOM_ELEMENTS.heroHeader.addEventListener('click', () => {
		DOM_ELEMENTS.heroBlock.classList.toggle('active');
		if (chevronIcon.classList.contains('fa-chevron-up')) {
			chevronIcon.classList.remove('fa-chevron-up');
			chevronIcon.classList.add('fa-chevron-down');
		} else {
			chevronIcon.classList.add('fa-chevron-up');
			chevronIcon.classList.remove('fa-chevron-down');
		}
	});
};

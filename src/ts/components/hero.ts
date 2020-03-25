import { DOM_ELEMENTS } from './ui_class';

export const hero = (): void => {
	const chevronIcon = document.getElementById('chevronIcon');
	const content = document.getElementById('content');

	// ---- SHOW BOOKING FORM ----

	DOM_ELEMENTS.heroHeader.addEventListener('click', () => {
		DOM_ELEMENTS.heroBlock.classList.toggle('active');
		content.classList.toggle('shadow');
		if (chevronIcon.classList.contains('fa-chevron-up')) {
			chevronIcon.classList.remove('fa-chevron-up');
			chevronIcon.classList.add('fa-chevron-down');
		} else {
			chevronIcon.classList.add('fa-chevron-up');
			chevronIcon.classList.remove('fa-chevron-down');
		}
	});
};

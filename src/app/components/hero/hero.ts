import { DOM_ELEMENTS, DOM_FORMS } from '../../../ts/dom-collection';

export const hero = (): void => {
	const chevronIcon = document.getElementById('chevronIcon');

	DOM_ELEMENTS.heroHeader.addEventListener('click', () => {
		DOM_ELEMENTS.heroBlockFirst.classList.toggle('active');
		if (chevronIcon.classList.contains('fa-chevron-up')) {
			chevronIcon.classList.remove('fa-chevron-up');
			chevronIcon.classList.add('fa-chevron-down');
		} else {
			chevronIcon.classList.add('fa-chevron-up');
			chevronIcon.classList.remove('fa-chevron-down');
		}
	});

	DOM_FORMS.formBooking.addEventListener('submit', (e) => {
		e.preventDefault();
		DOM_ELEMENTS.heroBlockFirst.classList.add('shrink');
		DOM_ELEMENTS.heroBlockSecond.classList.add('front');
	});

	DOM_ELEMENTS.heroBlockSecond.addEventListener('click', (e) => {
		const { trigger } = (e.target as HTMLElement).dataset;

		switch (trigger) {
			case 'back':
				DOM_ELEMENTS.heroBlockFirst.classList.remove('shrink', 'active');
				setTimeout(() => {
					DOM_ELEMENTS.heroBlockSecond.classList.remove('front');
					DOM_ELEMENTS.heroBlockFirst.classList.add('active');
				}, 150);
				break;

			default:
				break;
		}
	});
};

import { DOM_ELEMENTS } from '../../../ts/dom-collection';

export const sidebar = () => {
	DOM_ELEMENTS.sidebar.addEventListener('click', (e) => {
		const { trigger } = (e.target as HTMLElement).dataset;
		switch (trigger) {
			case 'sidebar':
				DOM_ELEMENTS.sidebar.classList.toggle('active');
				break;

			case 'collapse':
				(e.target as HTMLElement).nextElementSibling.classList.toggle('active');
				(e.target as HTMLElement).firstElementChild.classList.toggle('active');
				break;

			default:
				break;
		}
	});
};

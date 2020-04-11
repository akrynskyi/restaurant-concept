import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { database } from '../../../ts/database';

export const products = () => {
	DOM_ELEMENTS.productsContainer.addEventListener('click', (e) => {
		const { trigger } = (e.target as HTMLElement).dataset;
		const description = (e.target as HTMLElement).offsetParent.parentElement.lastElementChild;
		const id = (e.target as HTMLElement).offsetParent.parentElement.getAttribute('data-id');
		switch (trigger) {
			case 'description':
				description.classList.toggle('active');
				break;

			case 'like':
				database.updateFavourites(id);
				break;

			default:
				break;
		}
	});
};

import { firestore, firebase, auth } from '../../../js/firebase.cofig';
import { ProductsRender } from './products-render';
import { Pagination } from './pagination-class';
import { Storage } from '../../../ts/class-storage';
import { database } from '../../../ts/database';
import { ui } from '../../../ts/class-ui';
import { DOM_ELEMENTS } from '../../../ts/dom-collection';

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

	auth.onAuthStateChanged((user) => {
		firestore.collection('menu').onSnapshot((snapshot) => {
			const data: firebase.firestore.DocumentData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

			const productsRender = new ProductsRender({
				data,
				userFavourites: user !== null ? database.getFavourites(user.uid) : new Promise((resolve) => resolve([])),
				currentPage: Storage.getCurrentPage() ? Storage.getCurrentPage() : 1,
				itemsPerPage: 6,
			});

			const pagination = new Pagination({
				totalPages: productsRender.totalPages,
				currentPage: Storage.getCurrentPage() ? Storage.getCurrentPage() : 1,
				step: 3,
			});

			pagination.init(DOM_ELEMENTS.prodPagWrapper);

			// Render page

			productsRender.renderProductCart();

			if (user !== null) {
				productsRender.displayUserFavourites();
				ui.displayTooltip('[data-tooltip="like"]', 'disable');
			} else {
				productsRender.disableLikeBtns();
				ui.displayTooltip('[data-tooltip="like"]', 'enable');
			}

			// Pagination handle

			DOM_ELEMENTS.prodPagWrapper.addEventListener('click', (e) => {
				if (e.target === e.currentTarget) return;
				const { value } = e.target as HTMLButtonElement;
				const { page } = (e.target as HTMLElement).dataset;

				// Update page

				switch (page) {
					case 'prev':
						pagination.prevPage();
						productsRender.updatePage(pagination.currentPage);
						Storage.setCurrentPage(pagination.currentPage);
						break;

					case 'next':
						pagination.nextPage();
						productsRender.updatePage(pagination.currentPage);
						Storage.setCurrentPage(pagination.currentPage);
						break;

					default:
						productsRender.updatePage(parseInt(value, 10));
						Storage.setCurrentPage(parseInt(value, 10));
						break;
				}

				if (user !== null) {
					ui.displayTooltip('[data-tooltip="like"]', 'disable');
				} else {
					productsRender.disableLikeBtns();
					ui.displayTooltip('[data-tooltip="like"]', 'enable');
				}

				// Page transition

				ui.pageTransition(DOM_ELEMENTS.productsContainer, 'add');

				setTimeout(() => {
					ui.pageTransition(DOM_ELEMENTS.productsContainer, 'remove', 'active');
					ui.pageTransition(DOM_ELEMENTS.productsContainer, 'add', 'activeL');
				}, 400);

				setTimeout(() => {
					ui.pageTransition(DOM_ELEMENTS.productsContainer, 'remove', 'activeL');
				}, 800);
			});
		});
	});
};

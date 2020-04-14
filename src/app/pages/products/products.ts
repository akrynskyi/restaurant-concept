import { firestore, firebase, auth } from '../../../js/firebase.cofig';
import { ProductsRender } from './products-render';
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

			// Render page

			productsRender.renderProductCart();
			productsRender.displayPageBtns();

			if (user !== null) {
				productsRender.displayUserFavourites();
				ui.displayTooltip('[data-tooltip="like"]', 'disable');
			} else {
				productsRender.disableLikeBtns();
				ui.displayTooltip('[data-tooltip="like"]', 'enable');
			}

			DOM_ELEMENTS.prodPagWrapper.addEventListener('click', (e) => {
				if (e.target === e.currentTarget) return;
				const { value } = e.target as HTMLButtonElement;
				ui.optionActive(e, (e.currentTarget as HTMLElement).querySelectorAll('.btn--pag'));

				// Page transition

				ui.pageTransition(DOM_ELEMENTS.productsContainer, 'add');

				setTimeout(() => {
					ui.pageTransition(DOM_ELEMENTS.productsContainer, 'remove', 'active');
					ui.pageTransition(DOM_ELEMENTS.productsContainer, 'add', 'activeL');
				}, 400);

				setTimeout(() => {
					ui.pageTransition(DOM_ELEMENTS.productsContainer, 'remove', 'activeL');
				}, 800);

				// Update page

				setTimeout(() => {
					productsRender.updatePage(parseInt(value, 10));
					if (user !== null) {
						Storage.setCurrentPage(parseInt(value, 10));
						ui.displayTooltip('[data-tooltip="like"]', 'disable');
					} else {
						productsRender.disableLikeBtns();
						ui.displayTooltip('[data-tooltip="like"]', 'enable');
					}
				}, 500);
			});

			// Setup pagination

			DOM_ELEMENTS.prodPagWrapper.querySelectorAll('.btn--pag').forEach((btn) => {
				const { value } = btn as HTMLButtonElement;
				const currentPage = Storage.getCurrentPage() ? Storage.getCurrentPage() : 1;
				if (parseInt(value, 10) === currentPage) {
					btn.classList.add('active');
				}
			});
		});
	});
};

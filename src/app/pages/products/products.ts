import { fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { auth } from '../../../js/firebase.cofig';
import { productsRender } from './products-render';
import { Pagination } from './pagination-class';
import { Storage } from '../../../ts/class-storage';
import { database } from '../../../ts/database';
import { ui } from '../../../ts/class-ui';
import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { changeCategory, resetCategory, resetBtnHandle } from '../../components/sidebar/sidebar';
import { Product } from '../../../ts/interfaces';

export const products = () => {
	const prods: Product[] = [];
	const toSort: Product[] = [];
	let favIds: string[] = [];
	let filtered = false;
	let popular = false;
	let pickedCategory: string;

	productsRender.initializePage({
		data: prods,
		userFavourites: favIds,
		currentPage: Storage.getCurrentPage() ? Storage.getCurrentPage() : 1,
		itemsPerPage: 6,
	});

	const pagination = new Pagination({
		totalPages: productsRender.totalPages,
		currentPage: Storage.getCurrentPage() ? Storage.getCurrentPage() : 1,
		step: 2,
	});

	auth.onAuthStateChanged((user) => {
		if (user) {
			database.getFavourites()
				.then((fav) => {
					fav.forEach((item) => favIds.push(item));
				})
				.then(() => {
					productsRender.displayUserFavourites();
					ui.displayTooltip('[data-tooltip="like"]', 'disable');
				})
				.catch((error) => console.error(error));
		} else {
			productsRender.disableLikeBtns();
			ui.displayTooltip('[data-tooltip="like"]', 'enable');
		}
	});

	ui.loaderToggle('loaderProducts');

	database.getProducts()
		.finally(() => ui.loaderToggle('loaderProducts'))
		.then((prod) => {
			prod.forEach((item) => prods.push(item));
			prod.forEach((item) => toSort.push(item));
		})
		.then(() => {
			const user = auth.currentUser;
			pagination.totalPages = Math.ceil(prods.length / productsRender.itemsPerPage);
			productsRender.renderProductCart();
			productsRender.productsUpdateUI(user);
			pagination.init(DOM_ELEMENTS.prodPagWrapper);
		})
		.catch((error) => console.error(error));

	function updateFav(prodId: string, prodCenter: Element) {
		const exists = favIds.find((id) => prodId === id);
		const prodToUpdate = prods.find((prod) => prod.id === prodId);

		if (!exists) {
			prodToUpdate.likes += 1;
			prodCenter.classList.add('active');
			database.updateFavourites(prodId);
			favIds.push(prodId);
		} else {
			prodToUpdate.likes -= 1;
			database.removeFavourite(prodId);
			favIds = favIds.filter((id) => id !== prodId);
			productsRender.favourites = favIds;
		}

		setTimeout(() => {
			productsRender.renderProductCart();
			productsRender.displayUserFavourites();
		}, 500);
	}

	function filterByCategories(category: string) {
		const user = auth.currentUser;
		filtered = true;
		pickedCategory = category;

		if (!popular || popular) {
			productsRender.data = toSort.filter((item) => item.category === category);
		} else {
			productsRender.data = prods.filter((item) => item.category === category);
		}

		productsRender.currentPage = 1;
		productsRender.renderProductCart();
		productsRender.productsUpdateUI(user);

		pagination.totalPages = Math.ceil(productsRender.data.length / productsRender.itemsPerPage);
		pagination.currentPage = 1;

		if (pagination.totalPages > 1) {
			pagination.init(DOM_ELEMENTS.prodPagWrapper);
		} else {
			pagination.remove(DOM_ELEMENTS.prodPagWrapper);
		}
	}

	changeCategory().subscribe((category) => filterByCategories(category));

	function filterByPopularity() {
		const user = auth.currentUser;

		if (!popular && filtered) {
			popular = true;
			toSort.sort((a, b) => b.likes - a.likes);

			const categ = toSort.filter((item) => item.category === pickedCategory);
			productsRender.data = categ; /* .sort((a, b) => b.likes - a.likes); */
			DOM_ELEMENTS.btnProductsSort.innerText = 'Most popular';
		} else if (popular && filtered) {
			popular = false;
			toSort.sort((a, b) => b.likes - a.likes).reverse();

			const categ = toSort.filter((item) => item.category === pickedCategory);
			console.log(categ);
			productsRender.data = categ; /* .sort((a, b) => b.likes - a.likes).reverse(); */
			DOM_ELEMENTS.btnProductsSort.innerText = 'Less popular';
		} else if (!popular) {
			popular = true;
			productsRender.data = toSort.sort((a, b) => b.likes - a.likes);
			DOM_ELEMENTS.btnProductsSort.innerText = 'Most popular';
		} else if (popular) {
			popular = false;
			productsRender.data = toSort.sort((a, b) => b.likes - a.likes).reverse();
			DOM_ELEMENTS.btnProductsSort.innerText = 'Less popular';
		}

		productsRender.renderProductCart();
		productsRender.productsUpdateUI(user);
		DOM_ELEMENTS.btnProductsSort.classList.toggle('active');
		DOM_ELEMENTS.btnProductsSort.classList.add('fix-w');
	}

	function resetPageByDefault() {
		const user = auth.currentUser;

		popular = false;
		productsRender.data = prods;
		productsRender.renderProductCart();
		productsRender.productsUpdateUI(user);

		DOM_ELEMENTS.btnProductsSort.innerText = 'Popularity';
		DOM_ELEMENTS.btnProductsSort.classList.remove('active', 'fix-w');
		DOM_ELEMENTS.redoIco.classList.add('ico-spin');
		setTimeout(() => DOM_ELEMENTS.redoIco.classList.remove('ico-spin'), 1000);
	}

	const sort$ = fromEvent(DOM_ELEMENTS.productsSort, 'click')
		.pipe(
			map((event) => (event.target as HTMLElement).getAttribute('data-trigger')),
			filter((val) => val !== null),
		);

	sort$.subscribe((trigger) => {
		switch (trigger) {
			case 'sort':
				filterByPopularity();
				console.log('pop', popular);
				break;

			case 'reset':
				resetPageByDefault();
				break;

			default:
				break;
		}
	});

	resetCategory().subscribe((e) => {
		const user = auth.currentUser;
		filtered = false;

		if (!popular || popular) {
			productsRender.data = toSort;
		} else {
			productsRender.data = prods;
		}

		productsRender.renderProductCart();
		productsRender.productsUpdateUI(user);

		pagination.totalPages = Math.ceil(prods.length / productsRender.itemsPerPage);
		pagination.init(DOM_ELEMENTS.prodPagWrapper);

		resetBtnHandle(e);
	});

	DOM_ELEMENTS.productsContainer.addEventListener('click', (e) => {
		const { trigger } = (e.target as HTMLElement).dataset;
		const description = (e.target as HTMLElement).offsetParent.parentElement.lastElementChild;
		const prodCenter = (e.target as HTMLElement).parentElement.parentElement.previousElementSibling;
		const id = (e.target as HTMLElement).offsetParent.parentElement.getAttribute('data-id');

		switch (trigger) {
			case 'description':
				description.classList.toggle('active');
				break;

			case 'like':
				updateFav(id, prodCenter);
				break;

			default:
				break;
		}
	});

	const slide = () => {
		const options = {
			toRight: `
			opacity: 0; 
			transform: translateX(20%);
			transition: 
				transform .3s cubic-bezier(.8,.2,.24,.88),
				opacity .2s cubic-bezier(.8,.2,.24,.88) .1s;
			`,
			fromLeft: 'opacity: 0; transform: translateX(-20%)',
		};

		DOM_ELEMENTS.productsContainer.setAttribute('style', options.toRight);
		setTimeout(() => DOM_ELEMENTS.productsContainer.setAttribute('style', options.fromLeft), 500);
		setTimeout(() => DOM_ELEMENTS.productsContainer.removeAttribute('style'), 1000);
	};

	DOM_ELEMENTS.prodPagWrapper.addEventListener('click', (e) => {
		if (e.target === e.currentTarget) return;
		const { value } = e.target as HTMLButtonElement;
		const { page } = (e.target as HTMLElement).dataset;
		const user = auth.currentUser;

		switch (page) {
			case 'prev':
				pagination.prevPage();
				setTimeout(() => productsRender.updatePage(pagination.currentPage), 500);
				Storage.setCurrentPage(pagination.currentPage);
				break;

			case 'next':
				pagination.nextPage();
				setTimeout(() => productsRender.updatePage(pagination.currentPage), 500);
				Storage.setCurrentPage(pagination.currentPage);
				break;

			default:
				setTimeout(() => productsRender.updatePage(parseInt(value, 10)), 500);
				Storage.setCurrentPage(parseInt(value, 10));
				break;
		}

		setTimeout(() => productsRender.productsUpdateUI(user), 500);
		window.requestAnimationFrame(slide);
	});
};

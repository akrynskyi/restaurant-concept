import { fromEvent } from 'rxjs';
import {
	map,
	distinctUntilChanged,
	debounceTime,
	switchMap,
	tap,
} from 'rxjs/operators';
import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { database } from '../../../ts/database';
import { Product } from '../../../ts/interfaces';
import { auth } from '../../../js/firebase.cofig';

export const resetSearchBox = (resetInput: boolean = true) => {
	DOM_ELEMENTS.searchResultBox.removeAttribute('style');
	DOM_ELEMENTS.searchResultScrollable.innerHTML = '';
	if (resetInput) (DOM_ELEMENTS.searchInput as HTMLInputElement).value = '';
};

export const search = () => {
	let userFavId: string[] = [];
	let resultNotEmpty = false;

	function displayFavourites() {
		const icons = document.querySelectorAll('[data-icon="heart"]');
		icons.forEach((icon) => {
			const { id: prodId } = icon.parentElement.parentElement.parentElement.dataset;
			const liked = userFavId.find((id) => id === prodId);

			if (liked) {
				icon.setAttribute('style', 'color: #f50');
			} else {
				icon.removeAttribute('style');
			}
		});
	}

	function resetFavourites() {
		const icons = document.querySelectorAll('[data-icon="heart"]');
		icons.forEach((icon) => icon.removeAttribute('style'));
	}

	const search$ = fromEvent(DOM_ELEMENTS.searchInput, 'input')
		.pipe(
			map((event) => (event.target as HTMLInputElement).value.toLowerCase()),
			debounceTime(2000),
			distinctUntilChanged(),
			tap(() => { resetSearchBox(false); resultNotEmpty = false; }),
			switchMap((value) => (value ? database.getProducts()
				.then((products) => products.filter((prod) => prod.title.toLowerCase().includes(value))) : [])),
		);

	auth.onAuthStateChanged((user) => {
		if (user) {
			database.getFavourites()
				.then((favs) => favs.forEach((item) => userFavId.push(item)))
				.then(() => (resultNotEmpty ? displayFavourites() : null))
				.catch((error) => console.error(error));
		} else {
			userFavId = [];
			if (resultNotEmpty) resetFavourites();
		}
	});

	function renderSearchResult(product: Product) {
		return `
		<div class="result" data-id="${product.id}">
			<div class="result__group">
				<div class="result__picture">
					<img class="res-picture" src="${product.image}" alt="${product.title}" />
				</div>
				<div class="result__count">
					<span>${product.idx}</span>
				</div>
				<div class="result__title">
					<span>${product.title}</span>
				</div>
			</div>
			<div class="result__group">
				<div class="result__price">
					<span>$${product.price}</span>
				</div>
				<div class="result__like">
					<i class="fas fa-heart" data-icon="heart"></i>
					<span>${product.likes !== 0 ? product.likes : '...'}</span>
				</div>
			</div>
		</div>
		<!-- close .result-->
		`;
	}

	DOM_ELEMENTS.searchResultScrollable.addEventListener('click', (e) => {
		if ((e.target as HTMLElement).hasAttribute('data-id') && document.title !== 'Products') {
			window.location.href = '/products.html';
		}
	});

	search$.subscribe((prods: Product[]) => {
		if (prods.length > 1) {
			DOM_ELEMENTS.searchResultBox.setAttribute('style', 'display: block; bottom: -300px; height: 300px');
		} else {
			DOM_ELEMENTS.searchResultBox.setAttribute('style', 'display: block; bottom: -142px; height: 142px');
		}

		if (prods.length) {
			DOM_ELEMENTS.searchResultScrollable.innerHTML = prods
				.map((prod, idx) => (renderSearchResult({ ...prod, idx: idx + 1 }))).join('');
			resultNotEmpty = true;
			displayFavourites();
		} else {
			resultNotEmpty = false;
			DOM_ELEMENTS.searchResultScrollable.innerHTML = '<p class="placeholder-small">Nothing found...</p>';
		}
	});
};

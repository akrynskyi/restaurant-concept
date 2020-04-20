import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { Item } from '../../../ts/interfaces';

export class ProductsRender {
	data: firebase.firestore.DocumentData;
	favourites: Promise<string[]>;
	currentPage: number;
	totalPages: number;
	itemsPerPage: number;

	constructor(
		state: {
			data: firebase.firestore.DocumentData,
			userFavourites: Promise<string[]>,
			currentPage: number,
			itemsPerPage: number,
		},
	) {
		this.data = state.data;
		this.favourites = state.userFavourites;
		this.currentPage = state.currentPage;
		this.itemsPerPage = state.itemsPerPage;
		this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
	}

	paginateData() {
		const start = (this.currentPage - 1) * this.itemsPerPage;
		const end = start + this.itemsPerPage;
		return this.data.slice(start, end);
	}

	displayUserFavourites() {
		const likeBtns = document.querySelectorAll('[data-trigger="like"]');

		likeBtns.forEach((btn) => {
			const id = (btn as HTMLElement).offsetParent.parentElement.getAttribute('data-id');

			this.favourites
				.then((ids) => {
					const liked = ids.find((item) => item === id);
					if (liked) {
						(btn as HTMLElement).classList.add('red');
					} else {
						(btn as HTMLElement).classList.remove('red');
					}
				});
		});
	}

	disableLikeBtns() {
		const likeBtns = document.querySelectorAll('[data-trigger="like"]');

		likeBtns.forEach((btn) => {
			btn.classList.add('disabled');
		});
	}

	renderProductCart() {
		const data = this.paginateData();
		DOM_ELEMENTS.productsContainer.innerHTML = data.map((item: Item) => `
				<div class="product" data-id="${item.id}">
					<div class="product__overlay">
						<button class="btn-default btn-default--col btn-heart">
							<i class="fas fa-heart ico-heart" data-trigger="like"></i>
							<span class="like-count">${item.likes === 0 ? '' : item.likes}</span>
							<span class="tooltip-disabled" data-tooltip="like">To save your favourites sign in</span>
						</button>
						<button class="btn-default btn-default--col">
							<i class="fas fa-ellipsis-v" data-trigger="description"></i>
						</button>
					</div>
					<!-- close .product__overlay-->
					<div class="product__image-wrapper">
						<img class="product-image" src="${item.image}" alt="${item.title}" />
					</div>
					<!-- close .product__image-wrapper-->
					<div class="product__info">
						<div class="product__info-header">
							<span class="title">
								${item.title}
							</span>
							<span class="price">
								$${item.price}
							</span>
						</div>
						<div class="product__info-meta">
							<p>
								${item.type === 'food' ? `${item.portion}g` : `${item.portion}ml`}
							</p>
						</div>
					</div>
					<!-- close .product__info-->
					<div class="product__description">
						<span class="product__description-title">
							${item.title}
						</span>
						<p>
							${item.description}
						</p>
					</div>
					<!-- close .product__description-->
				</div>
				<!-- close .product-->
				`).join('');
	}

	updatePage(page: number) {
		this.currentPage = page;
		this.renderProductCart();
		this.displayUserFavourites();
	}
}

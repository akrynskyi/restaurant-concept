import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { Item } from '../../../ts/interfaces';

export const getLikeBtns = (favorites: Promise<string[]>) => {
	const likeBtns = document.querySelectorAll('[data-trigger="like"]');

	likeBtns.forEach((btn) => {
		const id = (btn as HTMLElement).offsetParent.parentElement.getAttribute('data-id');

		favorites
			.then((ids) => {
				const liked = ids.find((item) => item === id);
				if (liked) {
					(btn as HTMLElement).classList.add('red');
				} else {
					(btn as HTMLElement).classList.remove('red');
				}
			});
	});
};

export const setup = (data, fav) => {
	const state = {
		page: 1,
		items: 6,
		buttons: 3,
	};

	const pagination = () => {
		const pages = Math.ceil(data.length / state.items);

		const start = (state.page - 1) * state.items;
		const end = start + state.items;
		const trimmedData = data.slice(start, end);

		return {
			data: trimmedData,
			pages,
		};
	};

	const displayPageBtns = (pages: number) => {
		let left = state.page - Math.floor(state.buttons / 2);
		let right = state.page + Math.floor(state.buttons / 2);

		if (left < 1) {
			left = 1;
			right = state.buttons;
		} else if (right > pages && left !== 0) {
			left = pages - (state.buttons - 1);
			right = pages;
		}

		DOM_ELEMENTS.prodPagWrapper.innerHTML = '';

		for (let page = left; page <= right; page += 1) {
			DOM_ELEMENTS.prodPagWrapper.innerHTML += `
			<button class="btn btn--ml btn--pag" value="${page}">${page}</button>
			`;
		}
	};

	const renderProductCart = () => {
		const perPage = pagination();
		displayPageBtns(perPage.pages);
		console.log(perPage);

		DOM_ELEMENTS.productsContainer.innerHTML = perPage.data.map((item: Item) => `
				<div class="product" data-id="${item.id}">
					<div class="product__overlay">
						<button class="btn-default btn-default--col">
							<i class="fas fa-heart ico-heart" data-trigger="like"></i>
							<span class="like-count">${item.likes === 0 ? '' : item.likes}</span>
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
						<p>
							${item.description}
						</p>
					</div>
					<!-- close .product__description-->
				</div>
				<!-- close .product-->
				`).join('');
	};

	DOM_ELEMENTS.prodPagWrapper.addEventListener('click', (e) => {
		const { value } = e.target as HTMLButtonElement;
		DOM_ELEMENTS.productsContainer.innerHTML = '';
		state.page = value;
		renderProductCart();
		getLikeBtns(fav);
	});
	getLikeBtns(fav);
	renderProductCart();
};


export const disableLikeBtns = () => {
	const likeBtns = document.querySelectorAll('[data-trigger="like"]');

	likeBtns.forEach((btn) => {
		btn.classList.add('disabled');
	});
};

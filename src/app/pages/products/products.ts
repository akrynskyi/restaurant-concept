import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { getDataFromDatabase } from '../../../ts/database';
import { pubsub } from '../../../ts/pubsub';

export const products = () => {
	// create custom event
	const likeEvent = new CustomEvent('like', {
		detail: {
			liked: true,
		},
	});

	DOM_ELEMENTS.productsContainer.addEventListener('like', (e) => {
		console.log(e);
		pubsub.publish('like', e);
	});

	DOM_ELEMENTS.productsContainer.dispatchEvent(likeEvent);

	DOM_ELEMENTS.productsContainer.addEventListener('click', (e) => {
		const { trigger } = (e.target as HTMLElement).dataset;
		const description = (e.target as HTMLElement).offsetParent.parentElement.lastElementChild;
		switch (trigger) {
			case 'description':
				description.classList.toggle('active');
				pubsub.publish('consoleLog', 'Description open');
				break;
			case 'like':
				break;
			default:
				break;
		}
	});

	pubsub.subscribe('consoleLog', (data) => {
		console.log(data);
	});

	// pubsub.unsubscribe('consoleLog');

	pubsub.subscribe('like', (event) => {
		console.log(event.detail.liked);
	});

	getDataFromDatabase()
		.then((data) => {
			DOM_ELEMENTS.productsContainer.innerHTML = data.map((item) => `
				<div class="product">
					<div class="product__overlay">
						<button class="btn-default btn-default--col">
							<i class="fas fa-heart" data-trigger="like"></i>
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
							<span class="title">${item.title}</span>
							<span class="price">$${item.price}</span>
						</div>
						<div class="product__info-meta">
							<p>${item.portion}g</p>
						</div>
					</div>
					<!-- close .product__info-->
					<div class="product__description">
						<p>${item.description}</p>
					</div>
					<!-- close .product__description-->
				</div>
				<!-- close .product-->`).join('');
		});

	console.log(pubsub);
};

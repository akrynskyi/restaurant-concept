import { firestore, auth } from '../../../js/firebase.cofig';
import { database } from '../../../ts/database';
import { Item } from '../../../ts/interfaces';
import { ui } from '../../../ts/class-ui';
import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { signOut } from '../../../ts/authentication';

export const profile = () => {
	DOM_ELEMENTS.profileHeader.addEventListener('click', (e) => {
		const { trigger } = (e.target as HTMLElement).dataset;
		switch (trigger) {
			case 'signout':
				signOut();
				window.location.replace('/index.html');
				break;

			case 'close':
				window.location.href = '/index.html';
				break;
			default:
				break;
		}
	});

	DOM_ELEMENTS.favouriteScrollable.addEventListener('click', (e) => {
		const { id } = (e.target as HTMLElement).dataset;
		if ((e.target as HTMLElement).hasAttribute('data-id')) {
			database.removeFavourite(id);
		}
	});

	function favTemplateRender(item: Item) {
		return `
		<div class="favourite__item">
			<div class="favourite__item-picture">
				<img class="fav-picture" src="${item.image}" alt="favourite" />
			</div>
			<div class="favourite__item-content">
				<div class="favourite__item-info">
					<div class="favourite__item-info-title">
						<span>${item.title}</span>
					</div>
					<div class="favourite__item-info-description">
						<p>${item.description}</p>
					</div>
				</div>
				<div class="favourite__item-meta">
					<div class="favourite__item-meta-tag">
						<i class="ico-heart red fas fa-heart"></i>
						<span class="like-count">${item.likes === 0 ? '' : item.likes}</span>
					</div>
					<div class="favourite__item-meta-tag">
						<span>
							${item.type === 'food' ? `${item.portion}g` : `${item.portion}ml`}
						</span>
					</div>
					<div class="favourite__item-meta-tag">
						<span>$${item.price}</span>
					</div>
					<div class="favourite__item-remove">
						<button class="btn btn--hov" data-id="${item.id}">Remove</button>
					</div>
				</div>
			</div>
		</div>
		<!-- close .favourite__item-->`;
	}

	auth.onAuthStateChanged((user) => {
		firestore.collection('menu').onSnapshot((snapshot) => {
			const data: firebase.firestore.DocumentData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			database.getFavourites(user.uid)
				.then((ids) => {
					const userFavourites: [] = data.filter((item: Item) => ids.some((id) => item.id === id));
					DOM_ELEMENTS.favouriteScrollable.innerHTML = userFavourites.map((item) => favTemplateRender(item)).join('');
				});
		});
	});

	function hashChecker() {
		const { hash } = window.location;
		ui.pageActive(hash, '[data-nav="link"]', '[data-page]');
		ui.displayUserInfo('profile');
	}

	window.addEventListener('hashchange', hashChecker);
	document.addEventListener('DOMContentLoaded', hashChecker);
};

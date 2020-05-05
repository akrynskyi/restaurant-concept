import { firestore, auth } from '../../../js/firebase.cofig';
import { database } from '../../../ts/database';
import { Item } from '../../../ts/interfaces';
import { ui } from '../../../ts/class-ui';
import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { signOut } from '../../../ts/authentication';
import { Booking } from '../../components/hero/class-booking';

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
		const portion = {
			g: 'g',
			ml: 'ml',
		};

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
							${item.type === 'food' ? item.portion + portion.g : item.portion + portion.ml}
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

	function timelineTemplateRender(booking: Booking) {
		const options = {
			month: 'short',
			day: 'numeric',
		};
		const formatedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(booking.date));
		const bookingDate = new Date(`${booking.date} ${booking.time}`);
		const today = new Date();

		const d = today.getDate() + 1;
		const m = today.getMonth();
		const y = today.getFullYear();

		const tomorrow = new Date(y, m, d);

		/* eslint-disable @typescript-eslint/indent */
		/* eslint-disable no-nested-ternary */
		return `
		<div class="timeline__item">
			<span class="timeline__item-date">
				${today.setHours(0, 0, 0, 0) === bookingDate.setHours(0, 0, 0, 0) ? 'Today'
				: tomorrow.setHours(0, 0, 0, 0) === bookingDate.setHours(0, 0, 0, 0) ? 'Tom' : formatedDate}
			</span>
			<div class="timeline__item-content">
				<div class="timeline__item-group">
					<h4 class="timeline__item-title">
						Table ${booking.tableId}
					</h4>
					<span class="timeline__item-time">
						Time: ${booking.time.split(':', 2).join(':').toString()}
					</span>
				</div>
				<div class="timeline__item-group">
					<a class="link-default link-default--mod" href="#" data-id="${booking.id}">
						${today.getTime() <= bookingDate.getTime() ? 'Cancel' : 'Remove'}
					</a>
				</div>
			</div>
		</div>
		<!-- close .timeline__item-->`;
	}

	function placeholderRender(word: string, displayBtn: boolean) {
		const button = '<button class="btn btn--hov">Check some products</button>';
		return `
		<div class="placeholder">
			<div class="placeholder__item">
				<p>You ${word} list is empty</p>
			</div>
			${displayBtn ? button : null}
		</div>
		`;
	}

	auth.onAuthStateChanged((user) => {
		firestore.collection('menu').onSnapshot((snapshot) => {
			const data: firebase.firestore.DocumentData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			database.getFavourites(user.uid)
				.then((ids) => {
					const userFavourites: [] = data.filter((item: Item) => ids.some((id) => item.id === id));
					if (userFavourites.length) {
						DOM_ELEMENTS.favouriteScrollable.innerHTML = userFavourites
							.map((item) => favTemplateRender(item)).join('');
					} else {
						DOM_ELEMENTS.favouriteScrollable.innerHTML = placeholderRender('favourites', true);
					}
				})
				.catch((error) => console.error(error));
		});

		database.getBookings()
			.then((data) => {
				const userReservation: Booking[] = data.filter((item) => item.uid === user.uid);
				const timelineElement = document.createElement('div');
				timelineElement.className = 'timeline';
				if (userReservation.length) {
					timelineElement.innerHTML = userReservation
						.map((item) => timelineTemplateRender(item)).join('');

					DOM_ELEMENTS.reservationScrollable.appendChild(timelineElement);
					DOM_ELEMENTS.reservationTotal.innerHTML = `Total: ${userReservation.length.toString()}`;
				} else {
					DOM_ELEMENTS.reservationScrollable.innerHTML = placeholderRender('reservation', false);
				}
			});
	});

	function hashChecker() {
		const { hash } = window.location;
		ui.pageActive(hash, '[data-nav="link"]', '[data-page]');
		ui.displayUserInfo('profile');

		if (hash === '#reservation') {
			DOM_ELEMENTS.profileDash.classList.add('active');
		} else {
			DOM_ELEMENTS.profileDash.classList.remove('active');
		}
	}

	window.addEventListener('hashchange', hashChecker);
	document.addEventListener('DOMContentLoaded', hashChecker);
};

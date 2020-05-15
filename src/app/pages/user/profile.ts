import { firestore, auth } from '../../../js/firebase.cofig';
import { database } from '../../../ts/database';
import { Product } from '../../../ts/interfaces';
import { ui } from '../../../ts/class-ui';
import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { signOut } from '../../../ts/authentication';
import { Booking } from '../../components/hero/class-booking';

export const profile = () => {
	const timelineElement = document.createElement('div');
	const reservation: Booking[] = [];
	let reverse = false;

	DOM_ELEMENTS.favouriteScrollable.addEventListener('click', (e) => {
		const { id } = (e.target as HTMLElement).dataset;
		const { trigger } = (e.target as HTMLElement).dataset;
		if ((e.target as HTMLElement).hasAttribute('data-id')) {
			database.removeFavourite(id);
		}

		if (trigger) {
			window.location.href = '/products.html';
		}
	});

	function favTemplateRender(item: Product) {
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

		const todayDateOnly = today.setHours(0, 0, 0, 0);
		const tomorrowDateOnly = tomorrow.setHours(0, 0, 0, 0);
		const bookingDateOnly = bookingDate.setHours(0, 0, 0, 0);

		/* eslint-disable @typescript-eslint/indent */
		/* eslint-disable no-nested-ternary */
		return `
		<div class="timeline__item ${todayDateOnly > bookingDateOnly ? 'outdated' : ''}">
			<span class="timeline__item-date">
				${todayDateOnly === bookingDateOnly ? 'Today' : tomorrowDateOnly === bookingDateOnly ? 'Tom' : formatedDate}
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
					<a class="link-default link-default--mod ${todayDateOnly > bookingDateOnly ? 'darken' : ''}" href="#" data-id="${booking.id}">
						${today.getTime() <= bookingDate.getTime() ? 'Cancel' : 'Remove'}
					</a>
				</div>
			</div>
		</div>
		<!-- close .timeline__item-->`;
	}

	function placeholderRender(word: string, displayBtn: boolean) {
		return `
		<div class="placeholder">
			<div class="placeholder__item">
				<p>You ${word} list is empty</p>
			</div>
			${displayBtn ? '<button class="btn btn--hov" data-trigger="redirect">Check some products</button>' : ''}
		</div>
		`;
	}

	function displayReservation() {
		timelineElement.className = 'timeline';
		if (reservation.length) {
			timelineElement.innerHTML = reservation
				.map((item) => timelineTemplateRender(item)).join('');

			DOM_ELEMENTS.reservationScrollable.appendChild(timelineElement);
			DOM_ELEMENTS.reservationTotal.innerHTML = `Total: ${reservation.length.toString()}`;
		} else {
			DOM_ELEMENTS.reservationTotal.innerHTML = 'Total: 0';
			DOM_ELEMENTS.reservationScrollable.innerHTML = placeholderRender('reservation', false);
		}
	}

	function sortToggle(e: Event) {
		reverse = !reverse;

		(e.target as HTMLElement).classList.toggle('active');

		timelineElement.remove();
		reservation.reverse();
		displayReservation();

		if ((e.target as HTMLElement).classList.contains('active')) {
			(e.target as HTMLElement).innerText = 'Old first';
		} else {
			(e.target as HTMLElement).innerText = 'New first';
		}
	}

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

			case 'sort':
				sortToggle(e);
				break;
			default:
				break;
		}
	});

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
	});

	database.getBookings()
		.then((data) => {
			data.forEach((item) => reservation.push(item));
			displayReservation();
		})
		.catch((error) => console.error(error));

	DOM_ELEMENTS.reservationScrollable.addEventListener('click', (e) => {
		e.preventDefault();
		const { id } = (e.target as HTMLElement).dataset;
		if ((e.target as HTMLElement).hasAttribute('data-id')) {
			reservation.length = 0;
			database.removeBooking(id);

			database.getBookings()
				.then((data) => {
					data.forEach((item) => reservation.push(item));
					if (reverse) { reservation.reverse(); }
					displayReservation();
				})
				.catch((error) => console.error(error));
		}
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

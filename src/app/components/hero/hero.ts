import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Booking } from './class-booking';
import { Storage } from '../../../ts/class-storage';
import { DOM_ELEMENTS, DOM_FORMS } from '../../../ts/dom-collection';
import { database } from '../../../ts/database';
import { notif } from '../notification/notification-subject';
import { ui } from '../../../ts/class-ui';

export const hero = (): void => {
	const booking = new Booking();
	const tooltips: Element[] = [];

	// Reset state

	function resetUI() {
		(DOM_ELEMENTS.bookingDate as HTMLInputElement).value = '';
		(DOM_ELEMENTS.bookingTime as HTMLInputElement).value = '';
		DOM_ELEMENTS.bookingDate.classList.remove('invalid');
		DOM_ELEMENTS.bookingTime.classList.remove('invalid');
		DOM_ELEMENTS.tables.forEach((table) => table.classList.remove('active', 'picked', 'selected'));
	}

	document.addEventListener('DOMContentLoaded', resetUI);

	// Hero toggle

	DOM_ELEMENTS.heroHeader.addEventListener('click', () => {
		const chevronIcon = document.getElementById('chevronIcon');

		resetUI();
		DOM_ELEMENTS.heroBlockFirst.classList.toggle('active');

		if (chevronIcon.classList.contains('fa-chevron-up')) {
			chevronIcon.classList.remove('fa-chevron-up');
			chevronIcon.classList.add('fa-chevron-down');
		} else {
			chevronIcon.classList.add('fa-chevron-up');
			chevronIcon.classList.remove('fa-chevron-down');
		}
	});

	// Inputs validation
	// Hero form

	DOM_FORMS.formBooking.querySelectorAll('input').forEach((input) => {
		const tooltipForPhone = DOM_FORMS.formBooking.querySelector('#tipForPhone');

		input.addEventListener('input', (e) => {
			ui.validateInputs(e, input);
		});
		input.addEventListener('focus', (e) => {
			ui.validateInputs(e, input, 'focus');
			if ((e.target as HTMLInputElement).type === 'tel') {
				tooltipForPhone.classList.add('active');
			}
		});
		input.addEventListener('blur', (e) => {
			ui.validateInputs(e, input, 'blur');
			if ((e.target as HTMLInputElement).type === 'tel') {
				tooltipForPhone.classList.remove('active');
			}
		});
	});

	// Date && time

	DOM_ELEMENTS.bookingTime.addEventListener('focus', () => {
		DOM_ELEMENTS.tipWorkingHours.classList.add('active');
		DOM_ELEMENTS.bookingTime.classList.remove('invalid');
	});
	DOM_ELEMENTS.bookingTime.addEventListener('blur', () => {
		DOM_ELEMENTS.tipWorkingHours.classList.remove('active');
	});
	DOM_ELEMENTS.bookingDate.addEventListener('focus', () => {
		DOM_ELEMENTS.bookingDate.classList.remove('invalid');
	});

	DOM_FORMS.formBooking.addEventListener('submit', (e) => {
		e.preventDefault();
		const user: firebase.User = Storage.getUser();
		const {
			firstname,
			lastname,
			email,
			phone,
		} = e.currentTarget as HTMLFormElement;

		if (
			firstname.value.length
			&& lastname.value.length
			&& email.value.length
			&& phone.value.length
			&& user !== null
		) {
			booking.setUserInfo(
				user.uid,
				firstname.value,
				lastname.value,
				email.value,
				phone.value,
			);
			DOM_ELEMENTS.heroBlockFirst.classList.add('shrink');
			DOM_ELEMENTS.heroBlockSecond.classList.add('front');
		} else if (
			firstname.value.length
			&& lastname.value.length
			&& email.value.length
			&& phone.value.length
			&& user === null
		) {
			setTimeout(() => { ui.showModalDefault(DOM_ELEMENTS.overlaySignIn, DOM_ELEMENTS.modalSignIn); }, 1000);
			notif.getMessage({ message: 'Sign in or create account to continue reservation' });
		} else {
			notif.getMessage({ message: 'Complete all fields to continue' });
			(e.currentTarget as HTMLFormElement).querySelectorAll('input')
				.forEach((input) => (!input.value ? input.classList.add('invalid') : input.classList.remove('invalid')));
		}
	});

	function displayReservedTables(data: Booking[]) {
		const user: firebase.User = Storage.getUser();
		tooltips.length = 0;

		const text = {
			tableAndTime: 'My table</br>Time: ',
			time: 'Time: ',
		};

		/* eslint-disable @typescript-eslint/indent */
		data.forEach((item) => {
			const reserved = Array.from(DOM_ELEMENTS.tables)
				.find((table) => table.getAttribute('data-table') === item.tableId);
			reserved.innerHTML += `
				<span class="tooltip tooltip--fortable" data-tooltip="table">
					${user !== null && user.uid === item.uid
					? text.tableAndTime + item.time.split(':', 2).join(':').toString()
					: text.time + item.time.split(':', 2).join(':').toString()}
				</span>`;
			if (item.uid === user.uid) {
				reserved.classList.add('selected');
			} else {
				reserved.classList.remove('selected');
			}
			tooltips.push(reserved.firstElementChild);
		});

		DOM_ELEMENTS.tables.forEach((table) => {
			const tableId = table.getAttribute('data-table');
			const reserved = data.find((item) => item.tableId === tableId);

			if (reserved) {
				table.classList.remove('picked');
				table.classList.add('active');
				table.setAttribute('disabled', 'disabled');
			} else {
				table.classList.remove('active', 'selected');
				table.removeAttribute('disabled');
			}
		});
	}

	DOM_ELEMENTS.heroBlockSecond.addEventListener('click', (e) => {
		const { trigger } = (e.target as HTMLElement).dataset;
		const tableId = (e.target as HTMLElement).getAttribute('data-table');
		const dateValue = (DOM_ELEMENTS.bookingDate as HTMLInputElement).value;
		const timeValue = (DOM_ELEMENTS.bookingTime as HTMLInputElement).value;

		switch (trigger) {
			case 'back':
				DOM_ELEMENTS.heroBlockFirst.classList.remove('shrink', 'active');
				setTimeout(() => {
					DOM_ELEMENTS.heroBlockSecond.classList.remove('front');
					DOM_ELEMENTS.heroBlockFirst.classList.add('active');
				}, 150);
				break;

			case 'book':
				if (
					dateValue.length
					&& timeValue.length
					&& booking.tableId !== undefined
				) {
					// Make booking
					ui.loaderToggle('loaderHero');
					database.setBooking(booking);
					// Update UI
					database.getActualBookings()
						.finally(() => {
							ui.loaderToggle('loaderHero');
							notif.getMessage({ message: 'You have successfully reserved a table!' });
						})
						.then((data) => {
							tooltips.forEach((tooltip) => {
								tooltip.remove();
							});
							displayReservedTables(data);
						})
						.catch((error) => console.error(error));
					// Reset
					booking.reset();
					(DOM_ELEMENTS.bookingTime as HTMLInputElement).value = '';
				} else if (dateValue.length && timeValue.length) {
					notif.getMessage({ message: 'Please choose a table to continue!' });
				} else if (dateValue.length) {
					notif.getMessage({ message: 'Please choose a time to continue!' });
					DOM_ELEMENTS.bookingTime.classList.add('invalid');
				} else {
					notif.getMessage({ message: 'Choose a date to check available tables!' });
					DOM_ELEMENTS.bookingDate.classList.add('invalid');
				}
				break;

			default:
				if (tableId !== null) {
					booking.setTableId(tableId);
					ui.optionActive(e, DOM_ELEMENTS.tables, 'picked');
				}
				break;
		}
	});

	const time$ = fromEvent(DOM_ELEMENTS.bookingTime, 'input')
		.pipe(
			map((event) => (event.target as HTMLInputElement).value),
			distinctUntilChanged(),
		);
	time$.subscribe((time) => {
		booking.setTime(`${time}:00`);
	});

	const date$ = fromEvent(DOM_ELEMENTS.bookingDate, 'input')
		.pipe(
			map((event) => (event.target as HTMLInputElement).value),
			distinctUntilChanged(),
			debounceTime(2000),
		);
	date$.subscribe((date) => {
		database.date = date;
		booking.setDate(date);
		ui.loaderToggle('loaderHero');
		database.getActualBookings()
			.finally(() => {
				ui.loaderToggle('loaderHero');
			})
			.then((data) => {
				tooltips.forEach((tooltip) => {
					tooltip.remove();
				});
				displayReservedTables(data);
			})
			.catch((error) => console.error(error));
	});

	// Input mask

	(DOM_FORMS.formBooking as HTMLFormElement).phone.addEventListener('input', (e: Event) => {
		const x = (e.target as HTMLInputElement).value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
		(e.target as HTMLInputElement).value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
	});
};

// const currentDate = new Date(new Date().setHours(0, 0, 0, 0));
// const bookingDate = new Date(new Date(item.date).setHours(0, 0, 0, 0));
// console.log('Current date', currentDate);
// console.log('Booking date', bookingDate);

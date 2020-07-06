import { notif } from './notification-subject';
import { NotificationObserver } from './notification-observer';
import { DOM_ELEMENTS } from '../../../ts/dom-collection';

export const notification = () => {
	const displayNotification = new NotificationObserver((message: string) => {
		DOM_ELEMENTS.notifMessage.innerText = message;
		DOM_ELEMENTS.notification.classList.add('active');
	});
	const hideNotification = new NotificationObserver((message: string) => {
		if (message.length) {
			const timeoutHandle = setTimeout(() => {
				DOM_ELEMENTS.notification.classList.remove('active');
				DOM_ELEMENTS.notifMessage.innerText = '';
			}, 5000);

			DOM_ELEMENTS.closeNotifBtn.addEventListener('click', () => {
				DOM_ELEMENTS.notification.classList.remove('active');
				DOM_ELEMENTS.notifMessage.innerText = '';
				window.clearTimeout(timeoutHandle);
			});
		}
	});

	notif.subscribe(displayNotification);
	notif.subscribe(hideNotification);
};

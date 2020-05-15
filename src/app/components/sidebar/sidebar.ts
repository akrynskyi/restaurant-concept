import { Subject, Observable } from 'rxjs';
import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { ui } from '../../../ts/class-ui';

const categorySubject: Subject<string> = new Subject();
const resetSubject: Subject<Event> = new Subject();

export const changeCategory = (): Observable<string> => categorySubject.asObservable();
export const resetCategory = (): Observable<Event> => resetSubject.asObservable();

export const resetBtnHandle = (e: Event) => {
	DOM_ELEMENTS.productsCategoryList.forEach((option) => option.classList.remove('active'));
	(e.target as HTMLElement).classList.add('ico-spin');
	setTimeout(() => (e.target as HTMLElement).classList.remove('ico-spin'), 1000);
};

export const sidebar = () => {
	DOM_ELEMENTS.sidebar.addEventListener('click', (e) => {
		const { trigger, category } = (e.target as HTMLElement).dataset;
		if (category !== undefined) categorySubject.next(category);

		DOM_ELEMENTS.productsCategoryList
			.forEach((option) => (e.target === option ? ui.optionActive(e, DOM_ELEMENTS.productsCategoryList) : null));

		switch (trigger) {
			case 'sidebar':
				DOM_ELEMENTS.sidebar.classList.toggle('active');
				DOM_ELEMENTS.productsWrapper.classList.toggle('active');
				break;

			case 'collapse':
				(e.target as HTMLElement).nextElementSibling.classList.toggle('active');
				(e.target as HTMLElement).firstElementChild.classList.toggle('active');
				break;

			case 'reset':
				resetSubject.next(e);
				break;

			default:
				break;
		}
	});
};

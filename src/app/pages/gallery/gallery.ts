import { fromEvent, Observable, Observer } from 'rxjs';
import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { ui } from '../../../ts/class-ui';
import { API_KEY, API_URL } from '../../../js/unsplash_api';
import { Photos } from '../../../ts/photos-class';
import { Option, Post } from '../../../ts/interfaces';


export const gallery = () => {
	const photos = new Photos({
		apiUrl: API_URL,
		accessKey: API_KEY,
		keyWord: 'food',
		pageNum: 1,
		perPage: 20,
	});

	const setupGallery = () => {
		ui.loaderToggle('loaderGallery');

		photos.request()
			.finally(() => {
				ui.loaderToggle('loaderGallery');
			})
			.then((items) => {
				DOM_ELEMENTS.galleryContainer.innerHTML = items.map((item: Post) => {
					const { description, color, photos: imgs } = item;
					return `
					<div class="post" style="background-color: ${color}">
						<img class="post__image" src="${imgs.regular}" alt="${description === null ? 'Photo' : description}" />
						<div class="post__description">
							<span>${description === null ? 'No description' : description}</span>
						</div>
					</div>
					<!-- close .post -->
					`;
				}).join('');
			})
			.catch((error) => {
				console.error(error);
			});
	};
	setupGallery();

	const categoriesObservable$ = fromEvent(DOM_ELEMENTS.categoriesNav, 'click');
	const selectObservable$ = fromEvent(DOM_ELEMENTS.photosPerpageSelect, 'change');

	categoriesObservable$.subscribe((e) => {
		const { key } = (e.target as HTMLElement).dataset;
		ui.optionActive(e, DOM_ELEMENTS.categoriesNavOptions);
		photos.updateWord(key);
		setupGallery();
	});

	selectObservable$.subscribe((e) => {
		const { value } = e.target as Option;
		photos.updateVal(value);
		setupGallery();
	});

	const paginationObservable$ = Observable.create((observer: Observer<number>) => {
		let currentPage = 1;
		const update = (page: number) => {
			DOM_ELEMENTS.currentPage.innerHTML = page.toString();
		};

		DOM_ELEMENTS.galleryPagination.addEventListener('click', (e) => {
			if (e.target === e.currentTarget) return;
			const { page } = (e.target as HTMLElement).dataset;
			if (page === 'prev' && currentPage > 1) {
				setTimeout(() => {
					currentPage -= 1;
					update(currentPage);
					observer.next(currentPage);
				}, 1000);
			} else if (page === 'next' && currentPage < 10) {
				setTimeout(() => {
					currentPage += 1;
					update(currentPage);
					observer.next(currentPage);
				}, 1000);
			} else if (currentPage === 10) {
				currentPage = 1;
				update(currentPage);
				observer.next(currentPage);
			}
		});
	});

	paginationObservable$.subscribe((val: number) => {
		photos.updatePage(val);
		setupGallery();
	});
};

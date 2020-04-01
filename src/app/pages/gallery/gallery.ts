import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { ui } from '../../../ts/class-ui';
import { API_URL, API_KEY } from '../../../js/unsplash_api';
import { Photos } from '../../../ts/photos-class';
import { Post } from '../../../ts/interfaces';

export const gallery = () => {
	// ---- SETUP GALLERY ----

	const setupGallery = (word: string) => {
		const photos = new Photos({
			apiUrl: API_URL,
			accessKey: API_KEY,
			keyWord: word,
			pageNum: 5,
			perPage: 20,
		});

		ui.loaderToggle('loaderGallery');

		photos.request()
			.finally(() => {
				ui.loaderToggle('loaderGallery');
			})
			.then((items) => {
				let template = '';
				items.forEach((item: Post) => {
					const { description, photos: imgs } = item;
					template += `
					<div class="section-gallery__container-post">
						<img src="${imgs.regular}" alt="${description}" />
					</div>
					<!-- close .post -->
					`;
				});
				DOM_ELEMENTS.galleryContainer.innerHTML = template;
			})
			.catch((error) => {
				console.error(error);
			});
	};
	setupGallery('');

	// ---- CATEGORIES NAVIGATION ----

	DOM_ELEMENTS.categoriesNav.addEventListener('click', (e) => {
		const { key } = e.target.dataset;
		setupGallery(key);
	});
};

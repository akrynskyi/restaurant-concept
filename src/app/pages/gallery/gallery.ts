import { DOM_ELEMENTS } from '../../../ts/dom-collection';
import { API_URL, API_KEY } from '../../../js/unsplash_api';
import { Photos } from '../../../ts/photos-class';

export const gallery = () => {
	const photos = new Photos({
		apiUrl: API_URL,
		accessKey: API_KEY,
		keyWord: 'pasta',
		pageNum: 5,
		perPage: 20,
	});

	photos.request()
		.then((response) => {
			const data: [] = response.results;
			const items = data.map((item: Object) => ({ description: item.alt_description, photos: item.urls }));
			let template = '';
			items.forEach((item) => {
				const { description, photos: imgs } = item;
				template += `
				<div class="section-gallery__container-post">
					<img src="${imgs.regular}" alt="${description}" />
				</div>
				<!-- close .post -->
				`;
			});
			DOM_ELEMENTS.galleryContainer.innerHTML = template;
		});
};

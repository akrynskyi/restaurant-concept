import { DOM_ELEMENTS } from '../../../ts/dom-collection';

export class Lightbox {
	expanded = false;
	icon: HTMLElement;
	images: string[];
	imageIdx: number;

	open(e: Event) {
		const image = (e.target as HTMLElement).previousElementSibling
			? (e.target as HTMLElement).previousElementSibling.getAttribute('src')
			: false;
		const description = (e.target as HTMLElement).firstElementChild.innerHTML;

		if (image) {
			DOM_ELEMENTS.lightboxImg.setAttribute('src', image);
			DOM_ELEMENTS.lightboxImg.setAttribute('alt', description);
			DOM_ELEMENTS.lightboxOverlay.classList.add('visible');
			document.body.setAttribute('style', 'overflow: hidden');
			this.imageIdx = this.images.indexOf(image);
		}
	}

	close(e: Event) {
		if (!((e.target as HTMLElement).classList.contains('center') || e.target === e.currentTarget)) return;

		DOM_ELEMENTS.lightboxImg.removeAttribute('src');
		DOM_ELEMENTS.lightboxImg.removeAttribute('alt');
		DOM_ELEMENTS.lightboxOverlay.classList.remove('visible');
		document.body.removeAttribute('style');

		if (this.expanded) {
			DOM_ELEMENTS.lightboxImgWrap.removeAttribute('style');
			DOM_ELEMENTS.lightboxExpand.setAttribute('title', 'expand');
			this.icon.classList.add('fa-expand-alt');
			this.icon.classList.remove('fa-compress-alt');
		}
	}

	expand(e: Event) {
		this.icon = e.target as HTMLElement;

		if (this.icon.classList.contains('fa-expand-alt')) {
			this.icon.classList.remove('fa-expand-alt');
			this.icon.classList.add('fa-compress-alt');
			DOM_ELEMENTS.lightboxImgWrap.setAttribute('style', 'width: 100%; height: 100%;');
			DOM_ELEMENTS.lightboxExpand.setAttribute('title', 'compress');
			this.expanded = true;
		} else {
			this.icon.classList.add('fa-expand-alt');
			this.icon.classList.remove('fa-compress-alt');
			DOM_ELEMENTS.lightboxImgWrap.removeAttribute('style');
			DOM_ELEMENTS.lightboxExpand.setAttribute('title', 'expand');
			this.expanded = false;
		}
	}

	back() {
		if (this.imageIdx > 0) {
			this.imageIdx -= 1;
			const img = this.images[this.imageIdx];
			DOM_ELEMENTS.lightboxImg.setAttribute('src', img);
			DOM_ELEMENTS.lightboxImg.setAttribute('alt', 'lightbox-image => back');
		} else {
			this.imageIdx = 0;
		}
	}

	forward() {
		if (this.imageIdx < this.images.length - 1) {
			this.imageIdx += 1;
			const img = this.images[this.imageIdx];
			DOM_ELEMENTS.lightboxImg.setAttribute('src', img);
			DOM_ELEMENTS.lightboxImg.setAttribute('alt', 'lightbox-image => forward');
		} else {
			this.imageIdx = this.images.length - 1;
		}
	}
}

import { DOM_ELEMENTS } from '../../../ts/dom-collection';

export const home = () => {
	const slideOptions = {
		threshold: 0,
		rootMargin: '0px 0px -300px 0px',
	};
	const slideOnScroll = new IntersectionObserver(((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('appear');
			slideOnScroll.unobserve(entry.target);
		});
	}), slideOptions);

	DOM_ELEMENTS.slideInPanels.forEach((panel) => {
		slideOnScroll.observe(panel);
	});

	slideOnScroll.observe(DOM_ELEMENTS.subscribeSection);
};

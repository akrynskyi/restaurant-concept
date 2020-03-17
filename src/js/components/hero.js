export const hero = () => {
	const heroHeader = document.getElementById('heroHeader');
	const heroBlock = document.getElementById('heroBlock');
	const chevron = document.getElementById('chevronIcon');
	const content = document.getElementById('content');
	heroHeader.addEventListener('click', () => {
		heroBlock.classList.toggle('hero-block-active');
		content.classList.toggle('shadow');
		if (chevron.classList.contains('fa-chevron-up')) {
			chevron.classList.remove('fa-chevron-up');
			chevron.classList.add('fa-chevron-down');
		} else {
			chevron.classList.add('fa-chevron-up');
			chevron.classList.remove('fa-chevron-down');
		}
	});
};

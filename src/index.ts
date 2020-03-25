// SCSS
import './assets/scss/main.scss';

// JS
import { header } from './ts/components/header';
import { modal } from './ts/components/modal';
import { hero } from './ts/components/hero';

import { home } from './ts/home';
import { products } from './ts/products';
import { about } from './ts/about';

header();
modal();
hero();

const docTitle: string = document.title;

switch (docTitle) {
	case 'Home':
		home();
		break;
	case 'Products':
		products();
		break;
	case 'About':
		about();
		break;
	default:
		break;
}

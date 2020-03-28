// SCSS
import './assets/scss/main.scss';

// JS
import { header } from './app/components/header/header';
import { modal } from './app/components/modal-auth/modal';
import { hero } from './app/components/hero/hero';

import { home } from './app/pages/home/home';
import { products } from './app/pages/products/products';
import { gallery } from './app/pages/gallery/gallery';

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
	case 'Gallery':
		gallery();
		break;
	default:
		break;
}

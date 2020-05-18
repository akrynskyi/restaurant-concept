// SCSS
import './assets/scss/main.scss';

// Modules
import { header } from './app/components/header/header';
import { modal } from './app/components/modal-auth/modal';
import { hero } from './app/components/hero/hero';
import { notification } from './app/components/notification/notification';
import { sidebar } from './app/components/sidebar/sidebar';
import { search } from './app/components/search/search';

// Pages
import { home } from './app/pages/home/home';
import { products } from './app/pages/products/products';
import { gallery } from './app/pages/gallery/gallery';
import { profile } from './app/pages/user/profile';

const docTitle: string = document.title;

switch (docTitle) {
	case 'Home':
		home();
		search();
		header();
		modal();
		hero();
		notification();
		break;
	case 'Products':
		products();
		search();
		sidebar();
		header();
		modal();
		hero();
		notification();
		break;
	case 'Gallery':
		gallery();
		search();
		header();
		modal();
		hero();
		notification();
		break;
	case 'Profile':
		profile();
		break;
	default:
		break;
}

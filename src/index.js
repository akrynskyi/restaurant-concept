// SCSS
import './assets/scss/main.scss';

// JS
import { header } from './js/components/header';
import { modal } from './js/components/modal';
import { hero } from './js/components/hero';

import { home } from './js/home';
import { products } from './js/products';
import { about } from './js/about';

import './js/firebase/firebase';
import './js/firebase/authentication';

header();
modal();
hero();

const docTitle = document.title;

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

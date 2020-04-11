import { firestore, auth, firebase } from '../js/firebase.cofig';
import { ProductsRender } from '../app/pages/products/products-render';
import { Storage } from './class-storage';
import { DOM_ELEMENTS } from './dom-collection';
import { ui } from './class-ui';


export class Database {
	getData(user: firebase.User) {
		firestore.collection('menu').onSnapshot((snapshot) => {
			const data: firebase.firestore.DocumentData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			const page: string = document.title;

			const productsRender = new ProductsRender({
				data,
				userFavourites: user !== null ? this.getFavourites(user.uid) : new Promise((resolve) => resolve([])),
				currentPage: Storage.getCurrentPage() ? Storage.getCurrentPage() : 1,
				itemsPerPage: 6,
			});


			DOM_ELEMENTS.prodPagWrapper.addEventListener('click', (e) => {
				if (e.target === e.currentTarget) return;
				const { value } = e.target as HTMLButtonElement;

				setTimeout(() => {
					if (user !== null) {
						productsRender.updatePage(parseInt(value, 10));
						Storage.setCurrentPage(parseInt(value, 10));
					} else {
						productsRender.updatePage(parseInt(value, 10));
						productsRender.disableLikeBtns();
					}
				}, 500);


				ui.pageTransition(DOM_ELEMENTS.productsContainer, 'add');

				setTimeout(() => {
					ui.pageTransition(DOM_ELEMENTS.productsContainer, 'remove', 'active');
					ui.pageTransition(DOM_ELEMENTS.productsContainer, 'add', 'activeL');
				}, 350);
				setTimeout(() => {
					ui.pageTransition(DOM_ELEMENTS.productsContainer, 'remove', 'activeL');
				}, 700);
			});


			if (user !== null && page === 'Products') {
				productsRender.renderProductCart();
				productsRender.displayUserFavourites();
				productsRender.displayPageBtns();
			} else if (user === null && page === 'Products') {
				productsRender.renderProductCart();
				productsRender.disableLikeBtns();
				productsRender.displayPageBtns();
			}

			if (user !== null) {
				this.getFavourites(user.uid)
					.then((ids) => {
						const userFavourites: [] = data.filter((item) => ids.some((id) => item.id === id));
						console.log('User Favourites:', userFavourites);
					});
			}
		});
	}

	async getFavourites(uid: string): Promise<string[]> {
		const favouritesSnapshot = await firestore.collection('favourites').doc(uid).get();
		return favouritesSnapshot.data().ids;
	}

	async updateFavourites(docId: string) {
		const { uid } = auth.currentUser;
		const menuDocRef = firestore.collection('menu').doc(docId);
		const userDocRef = await firestore.collection('favourites').doc(uid).get();

		firestore.runTransaction(async (transaction) => {
			const sfDoc = await transaction.get(menuDocRef);
			if (!sfDoc.exists) {
				console.log('Document does not exist!');
			} else {
				const updateLikes = sfDoc.data().likes + 1;
				transaction.update(menuDocRef, { likes: updateLikes });
			}
		});

		menuDocRef
			.get()
			.then((menuDocSnapshot) => {
				if (!userDocRef.exists) {
					firestore.collection('favourites').doc(uid).set({
						ids: firebase.firestore.FieldValue.arrayUnion(menuDocSnapshot.id),
					});
				} else {
					firestore.collection('favourites').doc(uid).update({
						ids: firebase.firestore.FieldValue.arrayUnion(menuDocSnapshot.id),
					});
				}
			});
	}
}

export const database = new Database();

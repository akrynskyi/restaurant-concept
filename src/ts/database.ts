import { firestore, auth, firebase } from '../js/firebase.cofig';

export class Database {
	async getFavourites(uid: string): Promise<string[]> {
		const favouritesSnapshot = await firestore.collection('favourites').doc(uid).get();
		if (favouritesSnapshot.exists) {
			return favouritesSnapshot.data().ids;
		}
		return [];
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

	removeFavourite(docId: string) {
		const { uid } = auth.currentUser;
		const menuDocRef = firestore.collection('menu').doc(docId);
		const userDocRef = firestore.collection('favourites').doc(uid);

		firestore.runTransaction(async (transaction) => {
			const sfDoc = await transaction.get(menuDocRef);
			if (!sfDoc.exists) {
				console.log('Document does not exist!');
			} else {
				const updateLikes = sfDoc.data().likes - 1;
				transaction.update(menuDocRef, { likes: updateLikes });
			}
		});

		userDocRef.update({
			ids: firebase.firestore.FieldValue.arrayRemove(docId),
		});
	}
}

export const database = new Database();

import { firestore } from '../js/firebase.cofig';

export const getDataFromDatabase = () => firestore
	.collection('menu')
	.get()
	.then((snapshot) => snapshot.docs.map((doc) => doc.data()));

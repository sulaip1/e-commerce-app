import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBzcRWmJTbPhWmraEaalyBDLY5dA41GXtU",
    authDomain: "e-commerce-21ab7.firebaseapp.com",
    projectId: "e-commerce-21ab7",
    storageBucket: "e-commerce-21ab7.appspot.com",
    messagingSenderId: "790924210900",
    appId: "1:790924210900:web:c8dbd15a972e5f2b698141",
    measurementId: "G-LKMRB1WLM8"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) {
        return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const  { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating a user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
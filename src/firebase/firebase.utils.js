import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

 const config = {
    apiKey: "AIzaSyCLauzyKBYXuCN0evbUQwleOK4hWDFyqog",
    authDomain: "hash-db-da002.firebaseapp.com",
    projectId: "hash-db-da002",
    storageBucket: "hash-db-da002.appspot.com",
    messagingSenderId: "858930730598",
    appId: "1:858930730598:web:7834a2b0f387b29e347fa7",
    measurementId: "G-WHXZHN4P34"
 };

export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) return;
   const userRef = firestore.doc(`users/${userAuth.uid}`);
   const snapShot = await userRef.get();

   if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
         })
      } catch (error) {
         console.log('error createing user', error.message)
      }
   }
   return userRef;
   
    
 }
  
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); 
provider.setCustomParameters({ prompt: 'select_account' });

export const SignInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;
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
  
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); 
provider.setCustomParameters({ prompt: 'select_account' });

export const SignInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;
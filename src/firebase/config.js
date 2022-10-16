// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBguT5M0Ysr4-L3_hfMrVIpxWLSl_sGpjA",
  authDomain: "journal-app-b0b82.firebaseapp.com",
  projectId: "journal-app-b0b82",
  storageBucket: "journal-app-b0b82.appspot.com",
  messagingSenderId: "605210604913",
  appId: "1:605210604913:web:24134da79c9c9cf329f2d0"
};
// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_QxNxpGIQN9UE_-ualJD_CNV_ueAs-Zo",
  authDomain: "todo-app-a6775.firebaseapp.com",
  projectId: "todo-app-a6775",
  storageBucket: "todo-app-a6775.appspot.com",
  messagingSenderId: "497738992425",
  appId: "1:497738992425:web:3b116920403bd68ae90538"
};
// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );
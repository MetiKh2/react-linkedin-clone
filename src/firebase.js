// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnnpIdzdzogI6izTt2GWKKvG3bNYg_gFU",
  authDomain: "linkedin-clone3-745ff.firebaseapp.com",
  projectId: "linkedin-clone3-745ff",
  storageBucket: "linkedin-clone3-745ff.appspot.com",
  messagingSenderId: "423489928218",
  appId: "1:423489928218:web:775fa19b2cb14fb08a65a3",
  measurementId: "G-G3XH2FSZ92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db =getFirestore(app)
export const auth=getAuth()
export const googleAuthProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

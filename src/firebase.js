// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZNFSr8XQeme0te7BT7QNJddEcy5TJqWE",
  authDomain: "x-tm1-nesred.firebaseapp.com",
  projectId: "x-tm1-nesred",
  storageBucket: "x-tm1-nesred.appspot.com",
  messagingSenderId: "951964518451",
  appId: "1:951964518451:web:6d513bae5c31337cc0bb46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
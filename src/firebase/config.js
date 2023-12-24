// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth , GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBkU50rtcfm3d8GoNhfHtjTERV-NSFm3w8",
  authDomain: "newchat-6b7ca.firebaseapp.com",
  projectId: "newchat-6b7ca",
  storageBucket: "newchat-6b7ca.appspot.com",
  messagingSenderId: "1056686183648",
  appId: "1:1056686183648:web:b90c38a3674915012e2c85",
  measurementId: "G-MJT4ZCMY19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

// veritabanını ref alır
export const db = getFirestore(app)
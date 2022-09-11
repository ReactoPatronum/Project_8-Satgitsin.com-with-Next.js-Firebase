// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "satgitsin-98479.firebaseapp.com",
  projectId: "satgitsin-98479",
  storageBucket: "satgitsin-98479.appspot.com",
  messagingSenderId: "839076814777",
  appId: "1:839076814777:web:196284ed995a21bef46068",
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { app, db, auth, storage };

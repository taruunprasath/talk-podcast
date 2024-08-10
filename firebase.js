// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQZRUw7uhZfHIRS5vvWUn9GLSxHjxn9eo",
  authDomain: "podcast-b3702.firebaseapp.com",
  projectId: "podcast-b3702",
  storageBucket: "podcast-b3702.appspot.com",
  messagingSenderId: "312295527686",
  appId: "1:312295527686:web:a9d14d2a1cfe2cb722fa87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db =  getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {auth, db, storage};